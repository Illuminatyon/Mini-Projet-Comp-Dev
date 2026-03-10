import { useEffect, useRef } from 'react';
import useQuiz from '../hooks/useQuiz';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './QuizMode.css';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    quiz: ReturnType<typeof useQuiz>;
}

function QuizMode({ script, quiz }: QuizModeProps) {
    const { currentKana, answer, setAnswer, score, feedback, checkAnswer } = quiz;
    const [highScore, setHighScore] = useLocalStorage('js-app-highscore', 0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentKana]);

    useEffect(() => {
        if (score > highScore) setHighScore(score);
    }, [score, highScore, setHighScore]);

    const charToDisplay = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;
    const GOAL = 10;

    if (score >= GOAL) {
        return (
            <section className="quiz-container">
                <div className="quiz-card">
                    <div style={{ fontSize: '4rem' }}>🏆</div>
                    <h2 style={{ fontSize: '2rem', margin: '1rem 0', color: '#6366f1' }}>
                        Session Terminée !
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
                        Bravo ! Objectif de <b>{GOAL}</b> bonnes réponses atteint.
                    </p>
                    <div style={{
                        background: '#f1f5f9',
                        padding: '1.5rem',
                        borderRadius: '20px',
                        margin: '2rem 0',
                        fontWeight: 'bold'
                    }}>
                        Record actuel : {highScore} pts
                    </div>
                    <button
                        className="quiz-submit-btn"
                        onClick={() => window.location.reload()}
                    >
                        Recommencer une partie
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="quiz-container">
            <div className="stats-bar">
                <span>Objectif: <b>{score}</b> / {GOAL}</span>
                <span>Record: {highScore} 🏆</span>
            </div>

            <div className="quiz-card">
                <h1 className="display-kana">{charToDisplay}</h1>

                <form className="quiz-form" onSubmit={(e) => { e.preventDefault(); checkAnswer(); }}>
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
                        Vérifier
                    </button>
                </form>
                {feedback && (
                    <div className={`feedback-msg ${feedback.includes('Correct') ? 'success' : 'error'}`}>
                        {feedback}
                    </div>
                )}
            </div>
        </section>
    );
}

export default QuizMode;