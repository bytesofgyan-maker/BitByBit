import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto'; // We will use the npm package instead of CDN for stability

// --- EXAM DATA (From User's Script) ---
const EXAM_DATA = {
    gd: {
        title: "General Duty (GD)",
        totalQ: 50,
        maxMarks: 100,
        passMarks: 35,
        negMark: 0.5,
        correctMark: 2,
        subjects: [
            { name: "General Knowledge", questions: 15, marks: 30, color: "#d97706" }, 
            { name: "General Science", questions: 15, marks: 30, color: "#16a34a" }, 
            { name: "Maths", questions: 15, marks: 30, color: "#2563eb" }, 
            { name: "Logical Reasoning", questions: 5, marks: 10, color: "#9333ea" }
        ],
        syllabus: {
            "General Knowledge": ["Current Affairs", "Sports", "History", "Geography", "Awards"],
            "General Science": ["Biology (10th)", "Chemistry (10th)", "Physics (10th)"],
            "Maths": ["Number System", "HCF & LCM", "Percentage", "Average", "Ratio", "Mensuration"],
            "Logical Reasoning": ["Number Series", "Coding-Decoding", "Direction Sense", "Blood Relations"]
        }
    },
    tech: {
        title: "Technical",
        totalQ: 50,
        maxMarks: 200,
        passMarks: 80,
        negMark: 1.0,
        correctMark: 4,
        subjects: [
            { name: "GK", questions: 10, marks: 40, color: "#d97706" },
            { name: "Maths", questions: 15, marks: 60, color: "#2563eb" },
            { name: "Physics", questions: 15, marks: 60, color: "#0891b2" },
            { name: "Chemistry", questions: 10, marks: 40, color: "#be123c" }
        ],
        syllabus: {
            "GK": ["History", "Geography", "Current Affairs"],
            "Maths": ["Algebra", "Matrices", "Trigonometry", "Calculus"],
            "Physics": ["Kinematics", "Laws of Motion", "Thermodynamics"],
            "Chemistry": ["Physical", "Inorganic", "Organic"]
        }
    },
    clerk: {
        title: "Clerk / Store Keeper",
        totalQ: 50,
        maxMarks: 200,
        passMarks: "80 (32/part)",
        negMark: 1.0,
        correctMark: 4,
        subjects: [
            { name: "GK & Science", questions: 10, marks: 40, color: "#d97706" },
            { name: "Maths", questions: 10, marks: 40, color: "#2563eb" },
            { name: "Computer Science", questions: 5, marks: 20, color: "#4f46e5" },
            { name: "General English", questions: 25, marks: 100, color: "#059669" }
        ],
        syllabus: {
            "GK & Science": ["History", "Geography", "Basic Science"],
            "Maths": ["Arithmetic", "Algebra", "Mensuration"],
            "Computer": ["Basic CS", "MS Office", "Input/Output"],
            "English": ["Grammar", "Comprehension", "Vocabulary"]
        }
    }
};

const AgniveerPage = () => {
    const [role, setRole] = useState('gd');
    const [activeSubject, setActiveSubject] = useState(Object.keys(EXAM_DATA['gd'].syllabus)[0]);
    const [calculator, setCalculator] = useState({ correct: '', wrong: '', score: null });
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    // --- CHART LOGIC ---
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy previous chart to prevent overlay
        }

        const data = EXAM_DATA[role];
        const ctx = canvasRef.current.getContext('2d');

        chartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.subjects.map(s => s.name),
                datasets: [{
                    data: data.subjects.map(s => s.questions),
                    backgroundColor: data.subjects.map(s => s.color),
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { boxWidth: 12, padding: 15, font: { size: 11 } }
                    }
                }
            }
        });

        // Reset active subject when role changes
        setActiveSubject(Object.keys(data.syllabus)[0]);
        setCalculator({ correct: '', wrong: '', score: null }); // Reset calc
    }, [role]);

    // --- CALCULATOR LOGIC ---
    const handleCalculate = () => {
        const data = EXAM_DATA[role];
        const correct = parseInt(calculator.correct) || 0;
        const wrong = parseInt(calculator.wrong) || 0;

        if (correct + wrong > 50) return alert("Total attempts cannot exceed 50!");

        const score = (correct * data.correctMark) - (wrong * data.negMark);
        setCalculator(prev => ({ ...prev, score }));
    };

    const currentData = EXAM_DATA[role];

    return (
        <div className="bg-stone-50 min-h-screen text-stone-800 font-sans pb-20">
            {/* Header */}
            <header className="bg-stone-900 text-stone-100 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-amber-500 uppercase">Agniveer 2025</h1>
                            <p className="text-stone-400 text-sm mt-1">Indian Army Recruitment • Interactive Preparation Guide</p>
                        </div>
                        <div className="text-center md:text-right">
                            <span className="inline-block bg-green-800 text-green-100 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">25,000+ Vacancies</span>
                            <p className="text-xs text-stone-500 mt-1">Source: Official Notification 2025</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                
                {/* Introduction & Role Selector */}
                <section className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold text-stone-800 mb-3">Mission Briefing</h2>
                    <p className="text-stone-600 mb-8">
                        Select your target post below to unlock role-specific intelligence, visualize subject weightage, and plan your preparation strategy.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['gd', 'tech', 'clerk'].map((r) => (
                            <button 
                                key={r}
                                onClick={() => setRole(r)}
                                className={`px-6 py-3 rounded-lg border-2 font-bold shadow-sm transition-all transform hover:-translate-y-1 ${role === r ? 'bg-green-900 text-white border-green-900' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}
                            >
                                {r === 'gd' ? 'General Duty (GD)' : r === 'tech' ? 'Technical' : 'Clerk / SKT'}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Intelligence Brief */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Left: Exam Pattern */}
                    <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                                <span className="text-amber-600 text-2xl">⦿</span> Exam Pattern Analysis
                            </h3>
                            <p className="text-stone-500 text-sm mt-1">Breakdown for <span className="font-bold text-green-800">{currentData.title}</span>.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <StatBox label="Questions" value={currentData.totalQ} />
                            <StatBox label="Max Marks" value={currentData.maxMarks} />
                            <StatBox label="Pass Marks" value={currentData.passMarks} color="text-green-700" />
                            <StatBox label="Neg. Mark" value={`-${currentData.negMark}`} color="text-red-600" />
                        </div>

                        <div className="h-[300px] w-full flex justify-center">
                            <canvas ref={canvasRef}></canvas>
                        </div>
                    </div>

                    {/* Right: Syllabus */}
                    <div className="bg-white rounded-xl shadow-md border border-stone-200 p-6 flex flex-col h-full min-h-[400px]">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                                <span className="text-amber-600 text-2xl">☰</span> Syllabus Topics
                            </h3>
                            <p className="text-stone-500 text-sm mt-1">Detailed curriculum for the written test.</p>
                        </div>

                        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 border-b border-stone-100 no-scrollbar">
                            {Object.keys(currentData.syllabus).map(subject => (
                                <button
                                    key={subject}
                                    onClick={() => setActiveSubject(subject)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${activeSubject === subject ? 'bg-green-100 text-green-800 border-green-200' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}`}
                                >
                                    {subject}
                                </button>
                            ))}
                        </div>

                        <div className="flex-grow bg-stone-50 rounded-lg p-4 border border-stone-100 overflow-y-auto max-h-[300px]">
                            <h4 className="font-bold text-stone-800 mb-3 sticky top-0 bg-stone-50 py-2 border-b border-stone-200">{activeSubject} Topics</h4>
                            <ul className="grid grid-cols-1 gap-2">
                                {currentData.syllabus[activeSubject]?.map((topic, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-stone-600 bg-white p-2 rounded shadow-sm border border-stone-100">
                                        <span className="text-green-600 font-bold mt-0.5">›</span> {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Strategy Room (Calculator) */}
                <section className="bg-stone-800 rounded-xl shadow-lg p-6 md:p-8 text-stone-100">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2 space-y-4">
                            <h3 className="text-2xl font-bold text-amber-500">Strategy Room: Score Simulator</h3>
                            <p className="text-stone-300">Negative marking is the biggest threat. Use this tool to estimate your score.</p>
                            
                            {calculator.score !== null && (
                                <div className="p-4 bg-stone-700 rounded-lg border-l-4 border-amber-500 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="flex justify-between items-end border-b border-stone-500 pb-2 mb-2">
                                        <span className="text-stone-300 text-sm">Projected Score</span>
                                        <span className={`font-bold tracking-wider text-lg ${calculator.score >= parseInt(currentData.passMarks) ? 'text-green-400' : 'text-red-400'}`}>
                                            {calculator.score >= parseInt(currentData.passMarks) ? "QUALIFIED" : "RISKY"}
                                        </span>
                                    </div>
                                    <div className="text-3xl font-bold text-white">{calculator.score} <span className="text-base text-stone-400 font-normal">/ {currentData.maxMarks}</span></div>
                                </div>
                            )}
                        </div>

                        <div className="md:w-1/2 w-full bg-stone-900 p-6 rounded-lg border border-stone-700">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-wide text-stone-400 mb-1">Correct Attempts</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-stone-800 border border-stone-600 rounded p-2 text-white focus:border-amber-500 outline-none"
                                        value={calculator.correct}
                                        onChange={e => setCalculator({...calculator, correct: e.target.value})}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wide text-stone-400 mb-1">Wrong Attempts</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-stone-800 border border-stone-600 rounded p-2 text-white focus:border-red-500 outline-none"
                                        value={calculator.wrong}
                                        onChange={e => setCalculator({...calculator, wrong: e.target.value})}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <button onClick={handleCalculate} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded transition-colors shadow-lg">
                                Calculate Potential Score
                            </button>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

const StatBox = ({ label, value, color = "text-stone-800" }) => (
    <div className="bg-stone-50 p-3 rounded-lg text-center border border-stone-100">
        <div className="text-xs text-stone-500 uppercase tracking-wide">{label}</div>
        <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
);

export default AgniveerPage;