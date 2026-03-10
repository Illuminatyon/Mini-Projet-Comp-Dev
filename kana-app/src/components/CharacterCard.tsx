import './CharacterCard.css';

interface CharacterCardProps {
    character: string;
    romanji: string;
}

function CharacterCard({ character, romanji }: CharacterCardProps) {
    return (
        <div className="card">
            <div className="card-symbol">{character}</div>
            <div className="card-romanji">{romanji}</div>
        </div>
    );
}

export default CharacterCard;