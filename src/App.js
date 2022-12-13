import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png",  matched: false},
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png",  matched: false},
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png",  matched: false},
]


function App() {
  const [cards, setCard] = useState([])
  const [turns, setTurn] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
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
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCard(prevCards =>{
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              //spread as propriedades de card e muda matched para true
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)
  const resetTurn = () => {
    setDisabled(false)
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
          <SingleCard handleChoice={handleChoice} key={card.id} card={card} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
