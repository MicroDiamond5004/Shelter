import React, { useState, useEffect, useRef } from 'react';
import { photoCategoryCards } from './photo-category-cards/photo-category-cards';
import WelcomePage from './welcome-page/welcome-page';
import Menu from './menu/menu';
import MainCardsScreen from './main-cards/main-cards';
import VotePhase from './vote/vote';
import Layout from './layout/layout';
import { createVariables, onClickEffect } from '../../src/special-effects/applyer-special-effects/applyer-special-effects.js';
import { current } from '@reduxjs/toolkit';


function App() {
    const [step, setStep] = useState(0);
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
    const [catastropheCard, setCatastropheCard] = useState(null);
    const [totalRevealedCards, setTotalRevealedCards] = useState(0);
    const [isCatastrophePopupOpen, setIsCatastrophePopupOpen] = useState(false);
    const [cardsRevealed, setCardsRevealed] = useState(false);
    const [cardsPlayerRevealed, setCardsPlayerRevealed] = useState(false);
    const [isSpecialCardPopupOpen, setIsSpecialCardPopupOpen] = useState(null);
    const [round, setRound] = useState(0);
    const [nxtStep, setNxtStep] = useState(0);
    const [nxtRound, setNxtRound] = useState(-1);
    const [isBunkerPopupOpen, setIsBunkerPopupOpen] = useState(false);
    const [isEffectPopupOpen, setIsEffectPopupOpen] = useState(false);
    const [effectsActions, setEffectActions] = useState(null);
    const [effectType, setEffectType] = useState(null);

    const divRef = useRef(null);

    const ImagesArr = {
        Profession: [],
        Biology: [],
        Health: [],
        Hobby: [],
        Baggage: [],
        Facts: [],
        Special: [],
        Catastrofa: [],
        Danger: [], 
        Bunker: [],
    }


    useEffect(() => {
        const randomImage = photoCategoryCards.Catastrofa[Math.floor(Math.random() * photoCategoryCards.Catastrofa.length)];
        setCatastropheCard(randomImage);
    }, []);


    const startGame = (numPlayers) => {
        const bunkerCards = generateBunkerCard();
        const initialPlayers = Array.from({ length: numPlayers }, (_, index) => ({
            id: index + 1,
            cards: generateCards(),
            specialCard: generateExtraCard('Special'),
            revealedCards: [],
            bunkerCards: bunkerCards,
            isEliminated: false,
            revealedCardsBunker: [],
        }));
        setPlayers(initialPlayers);
        openCatastrophePopup();
        setStep(1);
        setEffectActions(createVariables(initialPlayers.map((curPlayer) => curPlayer.id), initialPlayers.map((curPlayer) => curPlayer.specialCard)));
    };


    const generateCards = () => {

        const categoryNames = Object.keys(photoCategoryCards).slice(0, 6);

        return categoryNames.map((category) => {
            const photos = photoCategoryCards[category];
            let flag = true;
            while (flag) {
                const imageIndex = Math.floor(Math.random() * photos.length);
                if (ImagesArr[category][0] === null || ImagesArr[category].indexOf(imageIndex) === -1) {
                    flag = false;
                    const randomImage = photos[imageIndex];
                    ImagesArr[category].push(imageIndex);
                    return { category, image: randomImage };
                }
            }
        })
    }


    const generateExtraCard = (curCategory) => {
        const photos = photoCategoryCards[curCategory];
        let flag = true;
        while (flag) {
            const imageIndex = Math.floor(Math.random() * photos.length);
            if (ImagesArr[curCategory][0] === null || ImagesArr[curCategory].indexOf(imageIndex) === -1) {
                flag = false;
                const randomImage = photos[imageIndex];
                ImagesArr[curCategory].push(imageIndex);
                return randomImage;
            }
        }
    }


    const generateBunkerCard = () => {
        return ['', '', '', '', ''].map((el, index) => {
            const photos = photoCategoryCards.Bunker;
            let flag = true;
            while (flag) {
                const imageIndex = Math.floor(Math.random() * photos.length);
                if (ImagesArr.Bunker[0] === null || ImagesArr.Bunker.indexOf(imageIndex) === -1) {
                    flag = false;
                    const randomImage = photos[imageIndex];
                    ImagesArr.Bunker.push(imageIndex);
                    return { category: `Bunker - ${index}`, image: randomImage };
                }
            }
        })
    }
    

    const showNextPlayer = () => {
        setCardsPlayerRevealed(false);
        // Сначала клонируем массив игроков
        const updatedPlayers = [...players];

        // Сбрасываем состояние карточек (переворот) для текущего игрока
        updatedPlayers[currentPlayerIndex].cards = updatedPlayers[currentPlayerIndex].cards.map(card => ({
            ...card,
            isRevealed: false // Сбрасываем флаг переворота
        }));
    
        // Обновляем состояние игроков
        setPlayers(updatedPlayers);
    
        // Переключаемся на следующего игрока
        if (currentPlayerIndex < players.length - 1) {
            setCurrentPlayerIndex(currentPlayerIndex + 1);
            alert(`Следующий игрок - ${currentPlayerIndex + 2}`);
            if (round !== 0) {
                setNxtStep(nxtStep - 1);
            }
        } else {
            setStep(2);
            setCurrentPlayerIndex(0);
            alert(`Следующее действие - Голосование`);
            setRound(round + 1);
        }

    };
    
    

    const selectCardToReveal = (cardIndex) => {
        const updatedPlayers = [...players];
        console.log(updatedPlayers);
        if (round !== nxtStep) {
            updatedPlayers[currentPlayerIndex].revealedCards.unshift(updatedPlayers[currentPlayerIndex].cards[cardIndex]);
            console.log(updatedPlayers[currentPlayerIndex].revealedCards);
            setNxtStep(nxtStep + 1);
            setTotalRevealedCards(totalRevealedCards + 1);
        }
        updatedPlayers[currentPlayerIndex].cards.forEach((card, index) => {
            if (index === cardIndex) {
                card.isRevealed = true;
                updatedPlayers[currentPlayerIndex].revealedCards[0] = updatedPlayers[currentPlayerIndex].cards[cardIndex];
                return;
            }
            card.isRevealed = false;
        });
        console.log(updatedPlayers);
        setPlayers(updatedPlayers);
    };

    const selectBunkerCardToReveal = (cardIndex) => {
        if (round !== nxtRound) {
            const updatedPlayers = [...players];
            updatedPlayers.forEach((curPlayer, playerIndex) => {
                curPlayer.bunkerCards.forEach((card, index) => {
                    if (index === cardIndex) {
                        card.isRevealed = true;
                        curPlayer.revealedCardsBunker.push(updatedPlayers[playerIndex].bunkerCards[cardIndex]);
                        return;
                    }
                    card.isRevealed = false;
                });
            })
            setNxtRound(nxtRound + 1);
            console.log(updatedPlayers);
            setPlayers(updatedPlayers);
        }
    };
    

    const handleVote = (playerId) => {
        if (playerId !== null) {
            setEliminatedPlayers([...eliminatedPlayers, playerId]);
            setStep(2);
            setCurrentPlayerIndex(0);
            players[playerId-1].isEliminated = true;
        } else {
            alert("Выберите игрока для голосования!");
        }
    };

    const openCatastrophePopup = () => {
        setIsCatastrophePopupOpen(true);
    };

    const closeCatastrophePopup = () => {
        setIsCatastrophePopupOpen(false);
    };

    const openSpecialCardPopup = () => {
        setIsSpecialCardPopupOpen(true);
    }

    const closeSpecialCardPopup = () => {
        setIsSpecialCardPopupOpen(false);
    }

    const openBunkerCardPopup = () => {
        setIsBunkerPopupOpen(true);
    }

    const closeBunkerCardPopup = () => {
        setIsBunkerPopupOpen(false);
    }

    const openEffectPopup = () => {
        setIsEffectPopupOpen(true);
    }

    const closeEffectPopup = () => {
        setIsEffectPopupOpen(false);
    }

    const nextRound = () => {
        setStep(1);
    };

    return (
        <Layout isEliminated={players[currentPlayerIndex]?.isEliminated && step !== 2}>
            <React.Fragment>
                <h1>Bunker Game</h1>
                {step === 0 && <WelcomePage onStart={startGame} />}
                {step === 1 && (
                    <>
                        <Menu
                            currentPlayer={currentPlayerIndex + 1}
                            totalRevealedCards={totalRevealedCards}
                            catastropheCard={catastropheCard}
                            onCatastropheClick={openCatastrophePopup}
                            onBunkerCardClick={openBunkerCardPopup}
                            currentRound={round + 1}
                        />
                        <div id="app-container">
                            <MainCardsScreen
                                player={players[currentPlayerIndex]}
                                onNext={showNextPlayer}
                                onSelectCard={selectCardToReveal}
                                cardsRevealed={cardsPlayerRevealed}
                                setCardsRevealed={setCardsPlayerRevealed}
                                onSpecialCardClick={openSpecialCardPopup}
                                showNextPlayer={showNextPlayer}
                                round={round}
                                players={players}
                            />
                        </div>
                    </>
                )}
                {step === 2 && step > 1 && (
                    <VotePhase players={players} onVote={handleVote} onNextRound={nextRound} />
                )}
                {isCatastrophePopupOpen && (
                    <ShowPopup cardSrc={catastropheCard} onClose={closeCatastrophePopup}  />
                )}
                {isSpecialCardPopupOpen && (
                    <ShowPopup 
                        cardSrc={players[currentPlayerIndex].specialCard} 
                        onClose={closeSpecialCardPopup} 
                        isSpecial={true} 
                        effectsActions={effectsActions} 
                        setPopUpStatus={openBunkerCardPopup}
                        clickEffect={(effect) => onClickEffect(effect, (effectType) => {
                            setEffectType(effectType);
                            openEffectPopup();
                        })}
                    />
                )}
                {isBunkerPopupOpen && (
                    <ShowPopupBunkerCards
                        onClose={closeBunkerCardPopup} 
                        player={players[currentPlayerIndex]} 
                        cardsRevealed={cardsRevealed}
                        onSelectCard={selectBunkerCardToReveal}
                    />
                )}
                {isEffectPopupOpen && (
                    <ShowPopupEffect
                        onClose={closeEffectPopup}
                        players={players}
                        cardsRevealed={cardsRevealed}
                        onSelectCard={selectBunkerCardToReveal}
                        effectType={effectType}
                        player={players[currentPlayerIndex]}
                    />
                )}
            </React.Fragment>
        </Layout>
    );
}

function ShowPopup({ cardSrc, onClose, isSpecial = false, effectsActions = null, setPopUpStatus = null, clickEffect = null}) {
    if (isSpecial) {
        const effectSrc = cardSrc.split('/')[cardSrc.split('/').length - 1];
        console.log(effectsActions[effectSrc], effectSrc);
    }

    function onClickEffect() {
        clickEffect(effectsActions[cardSrc.split('/')[cardSrc.split('/').length - 1]]);
    }

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <img src={cardSrc} alt={cardSrc} />
                { isSpecial && <button onClick={onClickEffect} className="special-button">Применить</button>}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

function ShowPopupBunkerCards({ onClose, player, cardsRevealed, onSelectCard }) {
    const handleSelectCard = (index) => {
        if (!player.cards[index].isRevealed) {
            // Карточка переворачивается

            onSelectCard(index);
        }
    };

    const revealdCategory = Array.from(player.revealedCardsBunker, (x) => x.category);
    console.log(typeof revealdCategory, revealdCategory, player.revealedCardsBunker);

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content w-90" onClick={(e) => e.stopPropagation()}>
                <div className="mini-container bg-transparent">
                    {player.bunkerCards.map((card, index) => (
                        <div
                            className={`card ${(revealdCategory.indexOf(card.category) !== -1) ? 'revealed' : 'hidden'}`}
                            key={index}
                            onClick={() => handleSelectCard(index)}
                        >
                            <h3>Карта Бункер {index + 1}</h3>
                            <img
                                src={(revealdCategory.indexOf(card.category) !== -1) ? card.image : '../../assets/images/Рубашка/Рубашка.png'}
                                alt={`${card.category} card`}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );  
}

function ShowPopupEffect({ onClose, players, cardsRevealed, onSelectCard, effectType, player }) {

    const handleSelectCard = (index) => {
        if (players.cards[index].isRevealed) {
            // Карточка переворачивается

            onSelectCard(index);
        }
    };

    console.log(effectType);

    let showListChoise = (effectType === 'Type') || (effectType === 'Players');
    let isBunkerCard = effectType === 'Bunker';

    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    // const revealdCategory = Array.from(player.cards (x) => x.category);
    // console.log(typeof revealdCategory, revealdCategory, player.revealedCardsBunker);

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content w-90" onClick={(e) => e.stopPropagation()}>
                <div className="mini-container bg-transparent">
                    {showListChoise && <select
                                value={((effectType !== 'Type') ? selectedPlayerId : selectedType) || ('Выберите')}
                                onChange={(e) => (effectType !== 'Type') ? setSelectedPlayerId(parseInt(e.target.value)) : setSelectedType(parseInt(e.target.value))}
                            >
                                <option value={null}>Select a {effectType === 'Players' ? 'Player' : 'Type'}</option>
                                    {(effectType === 'Players') && players.map(
                                        (player) =>
                                            !player.isEliminated && (
                                                <option key={player.id} value={player.id}>
                                                    Player {player.id}
                                                </option>
                                            )
                                    )}
                                    {(effectType === 'Type') && player.cards.map(
                                        (card) =>
                                            !player.isEliminated && (
                                                <option key={card.category} value={card.category}>
                                                    {card.category} cards
                                                </option>
                                            )
                                    )}
                                <button onClick={() => {}}>Выбрать</button>
                            </select>
                    }
                    {isBunkerCard && player.bunkerCards.map((bunkerCard, indexCard) => {
                            return(
                                <div
                                    className={`card revealed`}
                                    key={indexCard}
                                    onClick={() => handleSelectCard(indexCard)}
                                >
                                    <h3>Карта {bunkerCard.category}</h3>
                                    <img
                                        src={bunkerCard.image}
                                        alt={`${bunkerCard.category} card`}
                                    />
                                </div>
                            )    
                        })
                    }
                    {players.map((player, index) => {
                        const cardsCat = player.cards.reduce(function (result, card) {
                            return {
                              ...result,
                              [card.category]: card,
                            }
                        }, {})
                        return (player.cards.map((card, indexCard) => {
                            if (card === cardsCat[effectType]) {
                                return(
                                    <div
                                        className={`card revealed`}
                                        key={index}
                                        onClick={() => handleSelectCard(index)}
                                    >
                                        <h3>Карта {card.category} Игрока {index + 1}</h3>
                                        <img
                                            src={card.image}
                                            alt={`${card.category} card`}
                                        />
                                    </div>
                                );
                                }
                            })
                        )
                    })}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );  

}

export default App;
