import { useState } from 'react';
import ViewPlayers from '../view-players/view-players';

function MainCardsScreen({ player, showNextPlayer, onSelectCard, cardsRevealed, setCardsRevealed, onSpecialCardClick, round, players}) {

    let [selectedCardsIndex, setSelectedCardsIndex] = useState([]);

    let curDisabled = true;

    const handleSelectCard = (index) => {
        if (!player.cards[index].isRevealed) {
            const currentSelectedIndex = selectedCardsIndex;
            console.log(currentSelectedIndex, 'Before');
            currentSelectedIndex[round] = index;
            setSelectedCardsIndex(currentSelectedIndex);
            console.log(currentSelectedIndex, 'After');
            onSelectCard(index);
        }
    };
    

    const revealdCategory = Array.from(player.revealedCards, (x) => x.category); 

    return (
        <div>   
            <div >
            {player.isEliminated && <h1 className="eliminated-text">Игрок изган из бункера!</h1>}
                <div className='container'>
                    <ViewPlayers players={players} cardsRevealedIndex={selectedCardsIndex} cardsRevealed={cardsRevealed} player={player} />
                    <div className='right-block'>
                        <h2>Player {player.id}'s Turn</h2>
                        <button onClick={() => setCardsRevealed(!cardsRevealed)}>
                        {   cardsRevealed ? 'Скрыть карты' : 'Показать карты'}
                        </button>
                        <div className="card-container">
                            {player.cards.map((card, index) => (
                                <div
                                className={`card ${cardsRevealed | (revealdCategory.indexOf(card.category) !== -1) ? 'revealed' : 'hidden'} 
                                ${selectedCardsIndex?.indexOf(index) === -1 ? 'nochange' : ''}`}
                                key={index}
                                onClick={() => {
                                    handleSelectCard(index);
                                }}
                            >
                                <h3>{card.category} Card</h3>
                                <img
                                    src={cardsRevealed | (revealdCategory.indexOf(card.category) !== -1) ? card.image : '../../assets/images/Рубашка/Рубашка.png'}
                                    alt={`${card.category} card`}
                                />
                            </div>
                        ))}
                        </div>
                        <div className="extra-categories special-card">
                            <button 
                                key={12} 
                                onClick={() => onSpecialCardClick()} // Вставьте сюда функционал открытия попапа
                            >
                                Карта особого условия
                            </button>
                        </div>
                        <button onClick={showNextPlayer} className="next-player-btn" >Next Player</button>
                        <div className="extra-categories">
                            {/* {player.cards.map((card, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => alert(`Показываем карточку категории: ${card.category}`)} // Вставьте сюда функционал открытия попапа
                                >
                                    {card.category}
                                </button>
                            ))} */}
                        </div>
                    </div>
                </div>
                {/* Добавляем дополнительные кнопки категорий */}
            </div>
        </div>
    );
}

export default MainCardsScreen;
