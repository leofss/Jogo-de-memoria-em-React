import './css/SingleCard.css';

export default function SingleCard ({card, handleChoice, flipped}) {
    const handleClick = () => {
        handleChoice(card)
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src}></img>
                <img className="back" onClick={handleClick} src="/img/cover.png"></img>
            </div>
        </div>
    )
}