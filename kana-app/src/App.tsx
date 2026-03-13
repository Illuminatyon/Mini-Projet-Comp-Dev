import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { kanaData } from './data/kana';
import StudyMode from './components/StudyMode';
import QuizMode from './components/QuizMode';
import { useState } from 'react';

function App() {
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');

    return (
        <div className="app-container">
            <header>
                <h1>Apprendre le Japonais</h1>
                <nav className="main-nav">
                    <NavLink
                        to="/study"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Mode Étude
                    </NavLink>
                    <NavLink
                        to="/quiz"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Mode Quiz
                    </NavLink>
                </nav>
            </header>
            <main>
                <div className="script-selector">
                    <button
                        onClick={() => setScript('hiragana')}
                        disabled={script === 'hiragana'}
                    >
                        Hiragana
                    </button>
                    <button
                        onClick={() => setScript('katakana')}
                        disabled={script === 'katakana'}
                    >
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