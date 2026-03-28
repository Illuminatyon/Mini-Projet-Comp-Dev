import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { kanaData } from './data/kana';
import StudyMode from './components/study/StudyMode.tsx';
import QuizMode from './components/quiz/QuizMode.tsx';
import LoginForm from './components/auth/LoginForm.tsx';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase.ts';
import type { Session } from '@supabase/supabase-js';

function App() {
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) return null;

    if (!session) {
        return (
            <Routes>
                <Route path="*" element={<LoginForm />} />
            </Routes>
        );
    }

    return (
        <div className="app-container">
            <header>
                <h1>Apprendre le Japonais</h1>
                <nav className="main-nav">
                    <NavLink to="/study" className={({ isActive }) => isActive ? 'active' : ''}>
                        Mode Étude
                    </NavLink>
                    <NavLink to="/quiz" className={({ isActive }) => isActive ? 'active' : ''}>
                        Mode Quiz
                    </NavLink>
                    <button onClick={() => supabase.auth.signOut()}>
                        Déconnexion
                    </button>
                </nav>
            </header>
            <main>
                <div className="script-selector">
                    <button onClick={() => setScript('hiragana')} disabled={script === 'hiragana'}>
                        Hiragana
                    </button>
                    <button onClick={() => setScript('katakana')} disabled={script === 'katakana'}>
                        Katakana
                    </button>
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="/study" replace />} />
                    <Route path="/study" element={<StudyMode script={script} kanaData={kanaData}/>} />
                    <Route path="/quiz" element={<QuizMode script={script} kanaData={kanaData} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;