import type { Kana } from '../data/kana';
import CharacterGrid from './CharacterGrid';

interface StudyModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

const ROW_LABELS: Record<string, string> = {
    a:  'Voyelles — あ行',
    ka: 'Ligne か行',
    sa: 'Ligne さ行',
    ta: 'Ligne た行',
    na: 'Ligne な行',
    ha: 'Ligne は行',
    ma: 'Ligne ま行',
    ya: 'Ligne や行',
    ra: 'Ligne ら行',
    wa: 'Ligne わ行',
    n:  'Consonne — ん',
    ga: 'Ligne が行 (dakuten)',
    za: 'Ligne ざ行 (dakuten)',
    da: 'Ligne だ行 (dakuten)',
    ba: 'Ligne ば行 (dakuten)',
    pa: 'Ligne ぱ行 (handakuten)',
};

function StudyMode({ script, kanaData }: StudyModeProps) {
    const rows = [...new Set(kanaData.map(k => k.row))];
    return (
        <div className="study-container">
            {rows.map(row => {
                const characters = kanaData
                    .filter(k => k.row === row)
                    .map(k => ({
                        char: script === 'hiragana' ? k.hiragana : k.katakana,
                        rom: k.romanji,
                    }));
                return (
                    <CharacterGrid
                        key={row}
                        title={ROW_LABELS[row] || `Ligne ${row}`}
                        characters={characters}
                    />
                );
            })}
        </div>
    );
}

export default StudyMode;