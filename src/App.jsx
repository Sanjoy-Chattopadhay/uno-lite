// import React, { useState } from 'react';
// import './App.css';

// // All possible colors and numbers
// const colors = ['red', 'green', 'blue', 'yellow'];
// const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// // Function to create a random card
// const getRandomCard = () => {
//   return {
//     color: colors[Math.floor(Math.random() * colors.length)],
//     number: numbers[Math.floor(Math.random() * numbers.length)],
//   };
// };

// const App = () => {
//   const [hand, setHand] = useState(Array.from({ length: 5 }, getRandomCard));
//   const [topCard, setTopCard] = useState(getRandomCard());
//   const [message, setMessage] = useState('Your Turn!');

//   const playCard = (cardIndex) => {
//     const selectedCard = hand[cardIndex];

//     if (
//       selectedCard.color === topCard.color ||
//       selectedCard.number === topCard.number
//     ) {
//       const newHand = [...hand];
//       newHand.splice(cardIndex, 1);
//       setHand(newHand);
//       setTopCard(selectedCard);
//       setMessage('Good move!');
//     } else {
//       setMessage("You can't play that card!");
//     }
//   };

//   const drawCard = () => {
//     const newCard = getRandomCard();
//     setHand([...hand, newCard]);
//     setMessage('Card drawn!');
//   };

//   return (
//     <div className="app">
//       <h1>UNO Lite 🎨</h1>
//       <p className="message">{message}</p>

//       <div className="top-card">
//         <h2>Top Card</h2>
//         <div className={`card ${topCard.color}`}>
//           {topCard.number}
//         </div>
//       </div>

//       <div className="hand">
//         <h2>Your Hand</h2>
//         <div className="cards">
//           {hand.map((card, index) => (
//             <div
//               key={index}
//               className={`card ${card.color}`}
//               onClick={() => playCard(index)}
//             >
//               {card.number}
//             </div>
//           ))}
//         </div>
//       </div>

//       <button onClick={drawCard} className="draw-button">Draw Card</button>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import './App.css';

const colors = ['red', 'green', 'blue', 'yellow'];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const getRandomCard = () => {
  return {
    color: colors[Math.floor(Math.random() * colors.length)],
    number: numbers[Math.floor(Math.random() * numbers.length)],
  };
};

const App = () => {
  const [hand, setHand] = useState(Array.from({ length: 5 }, getRandomCard));
  const [botHand, setBotHand] = useState(Array.from({ length: 5 }, getRandomCard));
  const [topCard, setTopCard] = useState(getRandomCard());
  const [message, setMessage] = useState('Your Turn!');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const playCard = (cardIndex) => {
    if (!isPlayerTurn) return;

    const selectedCard = hand[cardIndex];
    if (selectedCard.color === topCard.color || selectedCard.number === topCard.number) {
      const newHand = [...hand];
      newHand.splice(cardIndex, 1);
      setHand(newHand);
      setTopCard(selectedCard);
      setMessage('Good move!');
      setIsPlayerTurn(false);
    } else {
      setMessage("You can't play that card!");
    }
  };

  const drawCard = () => {
    if (!isPlayerTurn) return;
    const newCard = getRandomCard();
    setHand([...hand, newCard]);
    setMessage('You drew a card.');
    setIsPlayerTurn(false);
  };

  const botPlayTurn = () => {
    setTimeout(() => {
      const playableIndex = botHand.findIndex(
        (card) => card.color === topCard.color || card.number === topCard.number
      );

      if (playableIndex !== -1) {
        const newBotHand = [...botHand];
        const playedCard = newBotHand.splice(playableIndex, 1)[0];
        setBotHand(newBotHand);
        setTopCard(playedCard);
        setMessage("Bot played a card.");
      } else {
        const newCard = getRandomCard();
        setBotHand([...botHand, newCard]);
        setMessage("Bot drew a card.");
      }

      setIsPlayerTurn(true);
    }, 1000);
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      botPlayTurn();
    }
  }, [isPlayerTurn]);

  return (
    <div className="app">
      <h1>UNO Lite vs Bot 🤖</h1>
      <p className="message">{message}</p>

      <div className="top-card">
        <h2>Top Card</h2>
        <div className={`card ${topCard.color}`}>
          {topCard.number}
        </div>
      </div>

      <div className="hand-section">
        <h2>Your Hand</h2>
        <div className="cards">
          {hand.map((card, index) => (
            <div
              key={index}
              className={`card ${card.color}`}
              onClick={() => playCard(index)}
            >
              {card.number}
            </div>
          ))}
        </div>
      </div>

      <button onClick={drawCard} className="draw-button" disabled={!isPlayerTurn}>
        Draw Card
      </button>

      <div className="hand-section">
        <h2>Bot's Hand ({botHand.length} cards)</h2>
        <div className="cards">
          {botHand.map((_, index) => (
            <div key={index} className="card back">🎴</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
