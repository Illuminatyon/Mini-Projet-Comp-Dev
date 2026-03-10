import { useState, useMemo } from 'react';
import type { Kana } from '../data/kana';

export type QuizMode = 'normal' | 'inverse';

interface UseQuizOptions {
    script: 'hiragana' | 'katakana';
    quizMode: QuizMode;
    selectedRows: string[];
}

export function useQuiz(kanaData: Kana[], options: UseQuizOptions) {
    const { script, quizMode, selectedRows } = options;
    const filteredKana = useMemo(() => {
        if (selectedRows.length === 0) return kanaData;
        return kanaData.filter(k => selectedRows.includes(k.row));
    }, [kanaData, selectedRows]);
    const shuffledKana = useMemo(() => {
        return [...filteredKana].sort(() => Math.random() - 0.5);
    }, [filteredKana]);
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const safeIndex = shuffledKana.length > 0 ? index % shuffledKana.length : 0;
    const currentKana = shuffledKana[safeIndex] ?? kanaData[0];
    const choices = useMemo(() => {
        if (quizMode !== 'inverse' || !currentKana) return [];
        const correctChar = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;
        const pool = kanaData.filter(k => {
            const char = script === 'hiragana' ? k.hiragana : k.katakana;
            return char !== correctChar;
        });
        const wrongs = [...pool]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(k => script === 'hiragana' ? k.hiragana : k.katakana);

        return [...wrongs, correctChar].sort(() => Math.random() - 0.5);
    }, [currentKana, quizMode, script, kanaData]);

    const checkAnswer = (providedAnswer?: string) => {
        const ans = (providedAnswer ?? answer).trim();
        if (!ans || feedback) return;

        let correct: boolean;
        if (quizMode === 'inverse') {
            const correctChar = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;
            correct = ans === correctChar;
        } else {
            correct = ans.toLowerCase() === currentKana.romanji.toLowerCase();
        }

        if (correct) {
            setScore(s => s + 1);
            setFeedback('Correct !');
        } else {
            const correctStr = quizMode === 'inverse'
                ? `${script === 'hiragana' ? currentKana.hiragana : currentKana.katakana} (${currentKana.romanji})`
                : currentKana.romanji;
            setFeedback(`Erreur : c'était ${correctStr}`);
        }

        setTimeout(() => {
            setIndex(i => (i + 1) % shuffledKana.length);
            setAnswer('');
            setFeedback(null);
        }, 1500);
    };

    const reset = () => {
        setIndex(0);
        setScore(0);
        setAnswer('');
        setFeedback(null);
    };

    return {
        currentKana,
        answer,
        setAnswer,
        score,
        feedback,
        checkAnswer,
        reset,
        choices,
        totalKana: filteredKana.length,
    };
}