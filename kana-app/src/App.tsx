import './App.css';
import { kanaData } from './data/kana';
import CharacterGrid from './components/CharacterGrid';

function App() {

    const hiraganaList = kanaData.map(k => ({
        char: k.hiragana,
        rom: k.romanji
    }));

    const katakanaList = kanaData.map(k => ({
        char: k.katakana,
        rom: k.romanji
    }));

    return (
        <div className="app-container">
            <header>
                <h1>Apprentissage du Japonais - Kana</h1>
            </header>
            <main>
                <CharacterGrid
                    title="Hiragana"
                    characters={hiraganaList}
                />
                <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #ccc' }} />
                <CharacterGrid
                    title="Katakana"
                    characters={katakanaList}
                />
            </main>
        </div>
    );
}

export default App;