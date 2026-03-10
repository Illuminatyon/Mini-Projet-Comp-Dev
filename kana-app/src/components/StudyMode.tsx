import type {Kana} from '../data/kana';
import CharacterGrid from './CharacterGrid';

interface StudyModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

function StudyMode({ script, kanaData }: StudyModeProps) {
    const formattedData = kanaData.map(k => ({
        char: script === 'hiragana' ? k.hiragana : k.katakana,
        rom: k.romanji
    }));

    return (
        <div className="study-container">
            <CharacterGrid
                title={script === 'hiragana' ? "Table des Hiragana" : "Table des Katakana"}
                characters={formattedData}
            />
        </div>
    );
}

export default StudyMode;