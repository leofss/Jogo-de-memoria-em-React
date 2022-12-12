import './css/SingleCard.css';

export default function SingleCard ({card}) {
    return (
        <div className="card">
            <div>
                <img className="front" src={card.src}></img>
                <img className="back" src="/img/cover.png"></img>
            </div>
        </div>
    )
}