import { useEffect, useRef, useState } from 'react';
import {useQuiz} from '../hooks/useQuiz';
import useLocalStorage from '../hooks/useLocalStorage';
import './QuizMode.css';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    quiz: ReturnType<typeof useQuiz>;
}

const GOAL = 10;

function QuizMode({ script, quiz }: QuizModeProps) {
    const { currentKana, answer, setAnswer, score, feedback, checkAnswer, reset } = quiz;
    const [highScore, setHighScore] = useLocalStorage<number>('js-app-highscore', 0);
    const [history, setHistory] = useLocalStorage<number[]>('js-app-history', []);
    const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const isFinished = score >= GOAL;
    useEffect(() => {
        if (!isFinished) inputRef.current?.focus();
    }, [currentKana, isFinished]);

    useEffect(() => {
        if (score > highScore) setHighScore(score);
    }, [score, highScore, setHighScore]);

    useEffect(() => {
        if (isFinished) {
            setHistory(prev => [score, ...prev].slice(0, 5));
        }
    }, [isFinished, score, setHistory]);

    const handleCheck = () => {
        const isCorrect = answer.toLowerCase().trim() === currentKana.romanji.toLowerCase();
        if (!isCorrect && !feedback) {
            const char = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;
            setWrongAnswers(prev =>
                Array.from(new Set([...prev, `${char} (${currentKana.romanji})`]))
            );
        }
        checkAnswer();
    };

    const handleReplay = () => {
        setWrongAnswers([]);
        reset();
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
                    <button className="quiz-submit-btn" onClick={handleReplay} style={{ marginTop: '2rem', width: '100%' }}>
                        <span>Rejouer</span>
                    </button>
                </div>
            </section>
        );
    }
    const charToDisplay = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;
    return (
        <section className="quiz-container">
            <div className="stats-bar">
                <span className="score-current">
                    Objectif <span>{score} / {GOAL}</span>
                </span>
                <span className="high-score">Record : {highScore} 🏆</span>
            </div>
            <div className="quiz-card">
                <h1 className="display-kana">{charToDisplay}</h1>
                <form className="quiz-form" onSubmit={(e) => { e.preventDefault(); handleCheck(); }}>
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