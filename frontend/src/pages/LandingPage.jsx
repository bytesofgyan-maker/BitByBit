import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Trophy, ChevronRight, GraduationCap, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-slate-50 font-sans text-slate-800">
            {/* --- HERO SECTION --- */}
            <header className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32 px-6">
                {/* Background Blobs (Ambient Glow) */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                    {/* Left: Text Content */}
                    <div className="md:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-400">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Live: AI Question Generator
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                            Master Exams <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
                                Bit by Bit.
                            </span>
                        </h1>
                        
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl">
                            Stop cramming. Start understanding. The smart learning platform that adapts to your pace with bite-sized notes and real-time analytics.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/register" className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 hover:-translate-y-1">
                                Get Started Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                            </Link>
                            <Link to="/login" className="px-8 py-4 rounded-xl font-bold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all flex items-center justify-center">
                                Login
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4 text-sm text-slate-500 pt-4 border-t border-slate-800 mt-8 w-max">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs text-white">
                                        <UserIcon />
                                    </div>
                                ))}
                            </div>
                            <p>Joined by <span className="text-white font-bold">1,000+</span> aspirants</p>
                        </div>
                    </div>
                    
                    {/* Right: Hero Image / Graphics */}
                    <div className="md:w-1/2 relative perspective-1000">
                        {/* Main Dashboard Card */}
                        <div className="relative bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 shadow-2xl transition-transform duration-700 ease-out hover:rotate-0 md:rotate-y-12">
                            {/* Window Controls */}
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <div className="ml-4 bg-slate-900 rounded-md px-3 py-1 text-xs text-slate-500 w-full font-mono">bitbybit.app/dashboard</div>
                            </div>
                            
                            {/* Mock UI Content */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-white font-bold text-lg">My Progress</h3>
                                    <span className="text-emerald-400 text-xs font-mono bg-emerald-400/10 px-2 py-1 rounded">+12% this week</span>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="bg-slate-700/50 rounded-xl p-4">
                                    <div className="flex justify-between text-sm text-slate-300 mb-2">
                                        <span>Operating Systems</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                                        <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Active Quiz Card */}
                                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl">
                                    <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Daily Quiz</h4>
                                        <p className="text-slate-400 text-sm">10 Questions • 15 Mins</p>
                                    </div>
                                    <button className="ml-auto bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                                        Resume
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge (Animation) */}
                        <div className="hidden md:flex absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 items-center gap-3 animate-bounce">
                            <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                                <Trophy size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Current Streak</p>
                                <p className="text-slate-800 font-bold text-lg">7 Days 🔥</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- FEATURES GRID --- */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Everything you need to ace it.</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">We've stripped away the clutter. No boring lectures, just high-yield notes and rigorous practice.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<BookOpen className="text-white" size={24} />}
                            color="bg-blue-500"
                            title="Bite-Sized Notes"
                            desc="Complex topics broken down into 5-minute reads. Perfect for last-minute revision."
                        />
                        <FeatureCard 
                            icon={<CheckCircle className="text-white" size={24} />}
                            color="bg-emerald-500"
                            title="Adaptive Quizzes"
                            desc="Questions that get harder as you get smarter. AI-driven difficulty adjustment."
                        />
                        <FeatureCard 
                            icon={<GraduationCap className="text-white" size={24} />}
                            color="bg-purple-500"
                            title="Detailed Analytics"
                            desc="Don't just see your score. See your weak spots with topic-wise performance matrices."
                        />
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to start your journey?</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10">Join thousands of students preparing for GATE, UGC-NET, and other competitive exams today.</p>
                    <Link to="/register" className="relative z-10 inline-block bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg hover:scale-105 transform duration-200">
                        Create Free Account
                    </Link>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-white border-t border-slate-100 py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-black text-2xl text-slate-900">
                        <span className="text-blue-600">Bit</span>byBit
                    </div>
                    <div className="flex gap-8 text-slate-500 text-sm font-medium">
                        <a href="#" className="hover:text-blue-600 transition-colors">Courses</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">About</a>
                    </div>
                    <p className="text-slate-400 text-sm">© 2025 Bit by Bit Inc.</p>
                </div>
            </footer>
        </div>
    );
};

// --- Helper Components ---
const FeatureCard = ({ icon, color, title, desc }) => (
    <div className="group bg-slate-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-transparent hover:border-slate-100">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 shadow-lg shadow-${color.replace('bg-', '')}/30 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
);

const UserIcon = () => (
    <svg className="w-full h-full text-slate-400 bg-slate-800 rounded-full p-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export default LandingPage;