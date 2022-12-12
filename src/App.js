import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]


function App() {
  const [cards, setCard] = useState([])
  const [turns, setTurn] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //duplica as cartas, randomizar a renderização, da id aleatroio para cada carta
  const shuffleCards = () => {
                          //spread a mesma array duas vezes na mesma array
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))

    setCard(shuffledCards)
    setTurn(0)
  }
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        console.log("Match")
        resetTurn()
      }else{
        console.log("Não match")
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo])


  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(prevTurn => prevTurn + 1)
  }
  
  return (
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card =>(
          <SingleCard handleChoice={handleChoice} key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
