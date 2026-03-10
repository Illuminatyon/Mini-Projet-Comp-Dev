import { useEffect, useRef } from 'react';
import useQuiz from '../hooks/useQuiz';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './QuizMode.css';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    quiz: ReturnType<typeof useQuiz>;
}

function QuizMode({ script, quiz}: QuizModeProps) {
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

    return (
        <section className="quiz-container">
            <div className="stats-bar">
                <span>Score: {score}</span>
                <span>Record: {highScore} 🏆</span>
            </div>

            <div className="quiz-card">
                <h1 className="display-kana">{charToDisplay}</h1>

                <form onSubmit={(e) => { e.preventDefault(); checkAnswer(); }}>
                    <input
                        className="quiz-input"
                        ref={inputRef}
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Rōmaji..."
                        disabled={!!feedback}
                    />
                </form>

                {feedback && <p className="feedback-msg">{feedback}</p>}
            </div>
        </section>
    );
}

export default QuizMode;