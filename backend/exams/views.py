from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Course, Exam, ExamAttempt, Question, Option, StudentResponse, Topic
from .serializers import CourseSerializer, ExamSerializer, ExamAttemptSerializer, TopicSerializer
from .ai_service import generate_questions_from_text # Import the helper
from django.conf import settings

class AIGeneratorViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser] # Only YOU can use this

    @action(detail=False, methods=['post'])
    def generate(self, request):
        topic_id = request.data.get('topic_id')
        num_questions = request.data.get('num_questions', 5)
        difficulty = request.data.get('difficulty', 'Medium')

        # 1. Get the notes from DB
        topic = get_object_or_404(Topic, id=topic_id)
        if not topic.study_notes:
            return Response({"error": "This topic has no notes to generate from."}, status=400)

        # 2. Call AI
        questions_json = generate_questions_from_text(topic.study_notes, num_questions, difficulty)
        
        return Response(questions_json)

    @action(detail=False, methods=['post'])
    def save_bulk(self, request):
        """Saves questions AND updates exam duration"""
        exam_id = request.data.get('exam_id')
        questions_data = request.data.get('questions', [])
        duration = request.data.get('duration') # <--- NEW INPUT

        exam = get_object_or_404(Exam, id=exam_id)
        
        # 1. Update Exam Duration if provided
        if duration:
            exam.duration_minutes = int(duration)
            exam.save()
        
        # 2. Save Questions (Existing logic)
        count = 0
        for q_data in questions_data:
            question = Question.objects.create(
                exam=exam,
                text_content=q_data['question_text'],
                marks=q_data.get('marks', 2)
            )
            for idx, opt_text in enumerate(q_data['options']):
                Option.objects.create(
                    question=question,
                    text=opt_text,
                    is_correct=(idx == q_data['correct_index'])
                )
            count += 1
            
        return Response({"status": "success", "added": count, "duration_updated": bool(duration)})
    
class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAuthenticated]

class ExamViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def start_attempt(self, request, pk=None):
        exam = self.get_object()
        attempt = ExamAttempt.objects.create(user=request.user, exam=exam)
        return Response({
            'attempt_id': attempt.id,
            'start_time': attempt.start_time,
            'duration': exam.duration_minutes
        })

    @action(detail=True, methods=['post'])
    def submit_exam(self, request, pk=None):
        exam = self.get_object()
        data = request.data
        attempt_id = data.get('attempt_id')
        answers = data.get('answers', {})

        try:
            attempt = ExamAttempt.objects.get(id=attempt_id, user=request.user, exam=exam)
        except ExamAttempt.DoesNotExist:
            return Response({"error": "Invalid attempt"}, status=400)

        if attempt.is_completed:
            return Response({"error": "Exam already submitted"}, status=400)

        score = 0
        questions_map = {q.id: q for q in exam.questions.all()}
        
        for q_id, opt_id in answers.items():
            question = questions_map.get(int(q_id))
            if not question: continue
            
            try:
                selected_option = Option.objects.get(id=opt_id, question=question)
            except Option.DoesNotExist: continue

            StudentResponse.objects.create(attempt=attempt, question=question, selected_option=selected_option)

            if selected_option.is_correct:
                score += question.marks
            else:
                score -= (question.marks * exam.negative_marking_ratio)

        attempt.total_score = max(0, score)
        attempt.submit_time = timezone.now()
        attempt.is_completed = True
        attempt.save()

        return Response({"score": attempt.total_score, "total_marks": exam.total_marks, "status": "Completed"})

class AttemptHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ExamAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ExamAttempt.objects.filter(user=self.request.user).order_by('-start_time')