import { useState } from 'react';
import type {Kana} from '../data/kana';
import './QuizMode.css';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

function QuizMode({ script, kanaData }: QuizModeProps) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const currentKana = kanaData[currentIndex];
    const displayChar = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userAnswer.trim()) return;
        const isCorrect = userAnswer.toLowerCase().trim() === currentKana.romanji.toLowerCase();
        setScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));
        setFeedback({
            message: isCorrect ? "Bien joué !" : `Raté ! La réponse était : "${currentKana.romanji}"`,
            type: isCorrect ? 'success' : 'error'
        });
        setTimeout(() => {
            const nextIndex = Math.floor(Math.random() * kanaData.length);
            setCurrentIndex(nextIndex);
            setUserAnswer('');
            setFeedback(null);
        }, 1500);
    };

    return (
        <div className="quiz-container">
            <div className="score-board">
                Score : <span>{score.correct} / {score.total}</span>
            </div>
            <div className="quiz-card">
                <div className="big-character">{displayChar}</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Écris en rōmaji..."
                        autoFocus
                        disabled={!!feedback}
                    />
                    <button type="submit" disabled={!!feedback}>Valider</button>
                </form>
                {feedback && (
                    <div className={`feedback ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizMode;