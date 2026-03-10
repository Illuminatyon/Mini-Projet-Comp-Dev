import { useEffect, useRef, useState } from 'react';
import { useQuiz, type QuizMode as QuizModeType } from '../hooks/useQuiz';
import useLocalStorage from '../hooks/useLocalStorage';
import type { Kana } from '../data/kana';
import './QuizMode.css';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

const GOAL = 10;
const ALL_ROWS = [
    { id: 'a',  label: 'あ' }, { id: 'ka', label: 'か' }, { id: 'sa', label: 'さ' },
    { id: 'ta', label: 'た' }, { id: 'na', label: 'な' }, { id: 'ha', label: 'は' },
    { id: 'ma', label: 'ま' }, { id: 'ya', label: 'や' }, { id: 'ra', label: 'ら' },
    { id: 'wa', label: 'わ' }, { id: 'n',  label: 'ん' }, { id: 'ga', label: 'が' },
    { id: 'za', label: 'ざ' }, { id: 'da', label: 'だ' }, { id: 'ba', label: 'ば' },
    { id: 'pa', label: 'ぱ' },
];

function QuizMode({ script, kanaData }: QuizModeProps) {
    const [quizMode, setQuizMode] = useState<QuizModeType>('normal');
    const [selectedRows, setSelectedRows] = useState<string[]>(ALL_ROWS.map(r => r.id));
    const [showSettings, setShowSettings] = useState(false);
    const { currentKana, answer, setAnswer, score, feedback, checkAnswer, reset, choices } =
        useQuiz(kanaData, { script, quizMode, selectedRows });
    const [highScore, setHighScore] = useLocalStorage<number>('js-app-highscore', 0);
    const [history, setHistory] = useLocalStorage<number[]>('js-app-history', []);
    const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const isFinished = score >= GOAL;
    const charToDisplay = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;
    useEffect(() => {
        if (!isFinished && quizMode === 'normal') inputRef.current?.focus();
    }, [currentKana, isFinished, quizMode]);
    useEffect(() => {
        if (score > highScore) setHighScore(score);
    }, [score, highScore, setHighScore]);
    useEffect(() => {
        if (isFinished) {
            setHistory(prev => [score, ...prev].slice(0, 5));
        }
    }, [isFinished]);
    const handleCheck = (providedAnswer?: string) => {
        const ans = providedAnswer ?? answer;
        if (!ans.trim() || feedback) return;

        const isCorrect = quizMode === 'inverse'
            ? ans === charToDisplay
            : ans.toLowerCase().trim() === currentKana.romanji.toLowerCase();

        if (!isCorrect) {
            setWrongAnswers(prev =>
                Array.from(new Set([...prev, `${charToDisplay} (${currentKana.romanji})`]))
            );
        }
        checkAnswer(ans);
    };
    const handleReplay = () => {
        setWrongAnswers([]);
        reset();
    };
    const toggleRow = (rowId: string) => {
        setSelectedRows(prev => {
            if (prev.includes(rowId)) {
                if (prev.length === 1) return prev; // au moins une ligne
                return prev.filter(r => r !== rowId);
            }
            return [...prev, rowId];
        });
        handleReplay();
    };
    const toggleAllRows = () => {
        setSelectedRows(prev =>
            prev.length === ALL_ROWS.length ? ['a'] : ALL_ROWS.map(r => r.id)
        );
        handleReplay();
    };
    if (isFinished) {
        const accuracy = Math.round((GOAL / (GOAL + wrongAnswers.length)) * 100);
        return (
            <section className="quiz-container">
                <div className="quiz-card">
                    <h2 className="summary-title">Session terminée</h2>
                    <div className="summary-stats">
                        <div className="summary-stat highlight">
                            <small>Score</small>
                            <strong>{score} pts</strong>
                        </div>
                        <div className="summary-stat">
                            <small>Record</small>
                            <strong>{highScore} pts</strong>
                        </div>
                        <div className="summary-stat">
                            <small>Précision</small>
                            <strong>{accuracy}%</strong>
                        </div>
                        <div className="summary-stat">
                            <small>Erreurs</small>
                            <strong>{wrongAnswers.length}</strong>
                        </div>
                    </div>
                    {wrongAnswers.length > 0 && (
                        <div className="wrong-answers">
                            <span className="wrong-answers-label">À réviser</span>
                            <div className="wrong-answers-list">
                                {wrongAnswers.map((w, i) => (
                                    <span key={i} className="wrong-tag">{w}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="session-history">
                        <span className="session-history-label">Sessions récentes</span>
                        <div className="history-dots">
                            {history.map((s, i) => (
                                <div key={i} className="history-dot">{s}</div>
                            ))}
                        </div>
                    </div>
                    <button
                        className="quiz-submit-btn"
                        onClick={handleReplay}
                        style={{ marginTop: '2rem', width: '100%' }}
                    >
                        <span>Rejouer</span>
                    </button>
                </div>
            </section>
        );
    }
    return (
        <section className="quiz-container">

            {/* Barre de score */}
            <div className="stats-bar">
                <span className="score-current">
                    Objectif <span>{score} / {GOAL}</span>
                </span>
                <span className="high-score">Record : {highScore} 🏆</span>
            </div>
            <div className="quiz-settings">
                <button
                    className="settings-toggle"
                    onClick={() => setShowSettings(v => !v)}
                >
                    ⚙ Personnaliser {showSettings ? '▲' : '▼'}
                </button>
                {showSettings && (
                    <div className="settings-panel">
                        <div className="settings-section">
                            <span className="settings-label">Mode</span>
                            <div className="mode-toggle">
                                <button
                                    className={quizMode === 'normal' ? 'active' : ''}
                                    onClick={() => { setQuizMode('normal'); handleReplay(); }}
                                >
                                    Normal <small>kana → rōmaji</small>
                                </button>
                                <button
                                    className={quizMode === 'inverse' ? 'active' : ''}
                                    onClick={() => { setQuizMode('inverse'); handleReplay(); }}
                                >
                                    Inverse <small>rōmaji → kana</small>
                                </button>
                            </div>
                        </div>
                        <div className="settings-section">
                            <span className="settings-label">
                                Lignes ({selectedRows.length}/{ALL_ROWS.length})
                                <button className="toggle-all-btn" onClick={toggleAllRows}>
                                    {selectedRows.length === ALL_ROWS.length
                                        ? 'Tout désélectionner'
                                        : 'Tout sélectionner'}
                                </button>
                            </span>
                            <div className="row-selector">
                                {ALL_ROWS.map(row => (
                                    <button
                                        key={row.id}
                                        className={`row-btn ${selectedRows.includes(row.id) ? 'active' : ''}`}
                                        onClick={() => toggleRow(row.id)}
                                    >
                                        {row.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </div>
            <div className="quiz-card">
                {quizMode === 'inverse' ? (
                    <>
                        <p className="quiz-mode-hint">Quel caractère correspond à...</p>
                        <h1 className="display-kana display-romanji">{currentKana.romanji}</h1>
                        <div className="choices-grid">
                            {choices.map((choice, i) => (
                                <button
                                    key={i}
                                    className={`choice-btn ${
                                        feedback
                                            ? choice === charToDisplay
                                                ? 'correct'
                                                : choice === answer
                                                    ? 'wrong'
                                                    : ''
                                            : ''
                                    }`}
                                    onClick={() => !feedback && handleCheck(choice)}
                                    disabled={!!feedback}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="display-kana">{charToDisplay}</h1>
                        <form
                            className="quiz-form"
                            onSubmit={(e) => { e.preventDefault(); handleCheck(); }}
                        >
                            <input
                                className="quiz-input"
                                ref={inputRef}
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Rōmaji..."
                                disabled={!!feedback}
                                autoComplete="off"
                            />
                            <button
                                className="quiz-submit-btn"
                                type="submit"
                                disabled={!!feedback || !answer.trim()}
                            >
                                <span>Vérifier</span>
                            </button>
                        </form>
                    </>
                )}

                {feedback && (
                    <p className={`feedback-msg ${feedback.includes('Correct') ? 'success' : 'error'}`}>
                        {feedback}
                    </p>
                )}
            </div>
        </section>
    );
}

export default QuizMode;