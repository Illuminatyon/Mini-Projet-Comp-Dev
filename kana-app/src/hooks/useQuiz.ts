import { useState, useMemo } from 'react';
import type {Kana} from '../data/kana';

function useQuiz(kanaData: Kana[]) {
    const shuffledKana = useMemo(() => {
        // eslint-disable-next-line react-hooks/purity
        return [...kanaData].sort(() => Math.random() - 0.5);
    }, [kanaData]);
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
            setFeedback("Correct !");
        } else {
            setFeedback(`Erreur : c'était ${currentKana.romanji}`);
        }
        setTimeout(() => {
            setIndex((i) => (i + 1) % shuffledKana.length);
            setAnswer('');
            setFeedback(null);
        }, 1500);
    };

    return { currentKana, answer, setAnswer, score, feedback, checkAnswer };
}

export default useQuiz;