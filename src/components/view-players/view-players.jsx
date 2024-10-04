function ViewPlayers({ players, cardsRevealedIndex, cardsRevealed, player }) {
    return(
        <div className='left-block'>
            {players.map((curPlayer) => {
            const revealdCategory = Array.from(curPlayer.revealedCards, (x) => x.category);
            return( 
                <div className={curPlayer.isEliminated ? 'mini-container eliminated' : 'mini-container'} key={Math.random()}>
                    <h2 className={curPlayer.isEliminated ? 'eliminated-text' : ''}>{curPlayer.id}<br/> Игрок</h2>
                        {curPlayer.cards.map((card, index) => (
                            <div 
                                className={`card mini-card ${((player == curPlayer) && (cardsRevealedIndex?.indexOf(index) !== -1) && cardsRevealed) | (revealdCategory.indexOf(card.category) !== -1) ? 'revealed' : 'hidden'}`}
                                key={index * 2}
                            >
                                <img
                                    src={((player == curPlayer) && (cardsRevealedIndex?.indexOf(index) !== -1) && cardsRevealed) | (revealdCategory.indexOf(card.category) !== -1) ? card.image : '../../assets/images/Рубашка/Рубашка.png'}
                                    alt={`${card.category} card`}
                                />
                            </div>
                        ))}
                </div>
            );
            })} 
        </div>
    )
}

export default ViewPlayers;
