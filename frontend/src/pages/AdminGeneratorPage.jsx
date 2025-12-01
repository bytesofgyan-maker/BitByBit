import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Loader2, Save, Trash2, Plus, Wand2, Clock } from 'lucide-react';

const AdminGeneratorPage = () => {
    const [topics, setTopics] = useState([]);
    const [exams, setExams] = useState([]);
    
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [numQ, setNumQ] = useState(5);
    const [difficulty, setDifficulty] = useState('Medium');
    
    const [generatedQuestions, setGeneratedQuestions] = useState([]);
    const [suggestedDuration, setSuggestedDuration] = useState(0); // <--- NEW: Timer Logic
    const [loading, setLoading] = useState(false);

    // Initial Load
    useEffect(() => {
        const loadData = async () => {
            try {
                const tRes = await api.get('topics/');
                const eRes = await api.get('exams/');
                setTopics(tRes.data);
                setExams(eRes.data);
            } catch(e) { console.error(e) }
        };
        loadData();
    }, []);

    // Update timer whenever question count changes
    useEffect(() => {
        // Standard: 1.5 minutes per question
        setSuggestedDuration(Math.ceil(generatedQuestions.length * 1.5));
    }, [generatedQuestions]);

    // 1. Generate AI Questions
    const handleGenerate = async () => {
        if (!selectedTopic) return alert("Select a topic first");
        setLoading(true);
        try {
            const res = await api.post('ai-generator/generate/', {
                topic_id: selectedTopic,
                num_questions: numQ,
                difficulty: difficulty
            });
            // Append new questions to existing list (so you can generate multiple batches)
            setGeneratedQuestions(prev => [...prev, ...res.data]);
        } catch (err) {
            alert("AI Generation failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    // 2. Add Manual Question
    const addManualQuestion = () => {
        setGeneratedQuestions(prev => [
            ...prev,
            {
                question_text: "New Question...",
                options: ["Option A", "Option B", "Option C", "Option D"],
                correct_index: 0,
                marks: 2
            }
        ]);
    };

    // 3. Save Everything
    const handleSave = async () => {
        if (!selectedExam) return alert("Select an Exam first");
        try {
            await api.post('ai-generator/save_bulk/', {
                exam_id: selectedExam,
                questions: generatedQuestions,
                duration: suggestedDuration // <--- Send the time!
            });
            alert(`Saved ${generatedQuestions.length} questions and set time to ${suggestedDuration} mins!`);
            setGeneratedQuestions([]);
        } catch (err) {
            alert("Failed to save.");
        }
    };

    // Helper: Update a specific question field
    const updateQuestion = (index, field, value) => {
        const updated = [...generatedQuestions];
        updated[index][field] = value;
        setGeneratedQuestions(updated);
    };

    return (
        <div className="max-w-6xl mx-auto p-8 font-sans bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <Wand2 className="text-purple-600" /> AI Question Generator
            </h1>

            {/* Controls Panel */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">1. Source Notes</label>
                    <select className="w-full p-2 border rounded bg-slate-50" onChange={e => setSelectedTopic(e.target.value)}>
                        <option value="">-- Select Topic --</option>
                        {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">2. Settings</label>
                    <div className="flex gap-2">
                        <input type="number" className="w-20 p-2 border rounded" value={numQ} onChange={e => setNumQ(e.target.value)} />
                        <select className="flex-1 p-2 border rounded" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-end">
                    <button 
                        onClick={handleGenerate} 
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-bold flex justify-center items-center gap-2 transition-all"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><Wand2 size={18}/> Generate Questions</>}
                    </button>
                </div>
                
                {/* Manual Add Button */}
                <div className="flex items-end">
                    <button 
                        onClick={addManualQuestion}
                        className="w-full bg-white border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-500 hover:text-blue-600 py-2.5 rounded-lg font-bold flex justify-center items-center gap-2 transition-all"
                    >
                        <Plus size={18} /> Add Manual
                    </button>
                </div>
            </div>

            {/* Questions Editor */}
            {generatedQuestions.length > 0 && (
                <div className="space-y-6 pb-32">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-700">Review & Edit ({generatedQuestions.length})</h2>
                        
                        {/* Target Exam & Timer Selector */}
                        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border shadow-sm">
                            <select className="p-2 bg-transparent outline-none font-medium" onChange={e => setSelectedExam(e.target.value)}>
                                <option value="">-- Select Target Exam --</option>
                                {exams.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
                            </select>
                            <div className="flex items-center gap-2 border-l pl-4">
                                <Clock size={16} className="text-slate-400"/>
                                <input 
                                    type="number" 
                                    className="w-16 p-1 border rounded text-center" 
                                    value={suggestedDuration} 
                                    onChange={e => setSuggestedDuration(e.target.value)}
                                />
                                <span className="text-sm text-slate-500">mins</span>
                            </div>
                        </div>
                    </div>

                    {generatedQuestions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 group hover:border-blue-300 transition-colors">
                            <div className="flex justify-between mb-4">
                                <span className="font-bold text-slate-300">#{qIdx + 1}</span>
                                <button 
                                    onClick={() => setGeneratedQuestions(prev => prev.filter((_, i) => i !== qIdx))}
                                    className="text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            
                            <textarea 
                                className="w-full p-3 border border-slate-200 rounded-lg mb-4 font-medium text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none"
                                value={q.question_text}
                                onChange={e => updateQuestion(qIdx, 'question_text', e.target.value)}
                                rows={2}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${q.correct_index === oIdx ? 'bg-green-50 border-green-500' : 'bg-slate-50 border-slate-200'}`}>
                                        <input 
                                            type="radio" 
                                            name={`q-${qIdx}`}
                                            checked={q.correct_index === oIdx} 
                                            onChange={() => updateQuestion(qIdx, 'correct_index', oIdx)}
                                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                                        />
                                        <input 
                                            className="bg-transparent border-none w-full focus:ring-0 text-sm"
                                            value={opt}
                                            onChange={(e) => {
                                                const updatedQs = [...generatedQuestions];
                                                updatedQs[qIdx].options[oIdx] = e.target.value;
                                                setGeneratedQuestions(updatedQs);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Floating Save Bar */}
            {generatedQuestions.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-6 z-50">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 uppercase font-bold">Total Questions</span>
                        <span className="font-bold">{generatedQuestions.length}</span>
                    </div>
                    <div className="w-px h-8 bg-slate-700"></div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 uppercase font-bold">Exam Duration</span>
                        <span className="font-bold">{suggestedDuration} mins</span>
                    </div>
                    <button 
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold ml-4 transition-colors flex items-center gap-2"
                    >
                        <Save size={18} /> Publish to App
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminGeneratorPage;
