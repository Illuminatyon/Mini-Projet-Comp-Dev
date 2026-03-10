import CharacterCard from './CharacterCard';
import './CharacterGrid.css';

interface CharacterItem {
    char: string;
    rom: string;
}

interface CharacterGridProps {
    title: string;
    characters: CharacterItem[];
}

function CharacterGrid({ title, characters }: CharacterGridProps) {
    return (
        <section className="grid-section">
            <h2>{title}</h2>
            <div className="grid-container">
                {characters.map((item, index) => (
                    <CharacterCard
                        key={index}
                        character={item.char}
                        romanji={item.rom}
                    />
                ))}
            </div>
        </section>
    );
}

export default CharacterGrid;