import { useState } from 'react';
import './App.css';
import { kanaData } from './data/kana';
import StudyMode from './components/StudyMode';
import QuizMode from './components/QuizMode';

function App() {
    const [mode, setMode] = useState<'study' | 'quiz'>('study');
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');

    return (
        <div className="app-container">
            <header>
                <h1>Apprendre le Japonais</h1>
                <nav className="main-nav">
                    <button
                        className={mode === 'study' ? 'active' : ''}
                        onClick={() => setMode('study')}
                    >
                        Mode Étude
                    </button>
                    <button
                        className={mode === 'quiz' ? 'active' : ''}
                        onClick={() => setMode('quiz')}
                    >
                        Mode Quiz
                    </button>
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
                {mode === 'study' ? (
                    <StudyMode script={script} kanaData={kanaData} />
                ) : (
                    <QuizMode script={script} kanaData={kanaData} />
                )}
            </main>
        </div>
    );
}

export default App;