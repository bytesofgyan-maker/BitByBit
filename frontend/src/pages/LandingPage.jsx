import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Trophy, ChevronRight, GraduationCap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-white font-sans text-slate-800">
            {/* Hero Section */}
            <header className="relative overflow-hidden bg-slate-900 text-white py-20 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 space-y-6">
                        <div className="inline-block bg-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                            Exam Preparation Simplified
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            Master your exams <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                Bit by Bit.
                            </span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            The smartest way to prepare for competitive exams. 
                            Bite-sized notes, topic-wise quizzes, and real-time analytics to track your growth.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2">
                                Start Learning Free <ChevronRight />
                            </Link>
                            <Link to="/login" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition-all border border-slate-700">
                                Login
                            </Link>
                        </div>
                    </div>
                    
                    {/* Hero Graphic */}
                    <div className="md:w-1/2 relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                        <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-slate-400 text-xs ml-auto">Live Exam Dashboard</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                                    <div className="bg-green-500/20 p-2 rounded text-green-400"><CheckCircle size={20} /></div>
                                    <div className="flex-1">
                                        <div className="h-2 w-24 bg-slate-600 rounded mb-1"></div>
                                        <div className="h-2 w-16 bg-slate-600 rounded opacity-50"></div>
                                    </div>
                                    <span className="text-green-400 font-mono text-sm">+4.0</span>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                                    <div className="bg-blue-500/20 p-2 rounded text-blue-400"><Clock size={20} /></div>
                                    <div className="flex-1">
                                        <div className="h-2 w-32 bg-slate-600 rounded mb-1"></div>
                                        <div className="h-2 w-20 bg-slate-600 rounded opacity-50"></div>
                                    </div>
                                    <span className="text-blue-400 font-mono text-sm">12:30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">Why Students Choose Us</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<BookOpen className="text-blue-600" />}
                            title="Structured Learning"
                            desc="Don't get overwhelmed. We break down complex syllabi into manageable chapters and topics."
                        />
                        <FeatureCard 
                            icon={<Clock className="text-purple-600" />}
                            title="Real Exam Simulation"
                            desc="Practice with the exact same timer logic and negative marking as your actual exam."
                        />
                        <FeatureCard 
                            icon={<Trophy className="text-yellow-600" />}
                            title="Performance Analytics"
                            desc="Instant results with detailed matrices. Know exactly which topics need more revision."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;