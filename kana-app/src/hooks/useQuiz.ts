import { useState, useMemo } from 'react';
import type { Kana } from '../data/kana';

function useQuiz(kanaData: Kana[]) {
    const shuffledKana = useMemo(() => {
        return [...kanaData].sort(() => Math.random() - 0.5);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);

    const currentKana = shuffledKana[index];

    const checkAnswer = () => {
        if (!answer.trim() || feedback) return;
        const correct = answer.toLowerCase().trim() === currentKana.romanji.toLowerCase();
        if (correct) {
            setScore(s => s + 1);
            setFeedback('Correct !');
        } else {
            setFeedback(`Erreur : c'était ${currentKana.romanji}`);
        }
        setTimeout(() => {
            setIndex(i => (i + 1) % shuffledKana.length);
            setAnswer('');
            setFeedback(null);
        }, 1500);
    };

    const reset = () => {
        setIndex(0);
        setAnswer('');
        setScore(0);
        setFeedback(null);
    };

    return { currentKana, answer, setAnswer, score, feedback, checkAnswer, reset };
}

export default useQuiz;