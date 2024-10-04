function Menu({ currentPlayer, totalRevealedCards, catastropheCard, onCatastropheClick, currentRound,  onBunkerCardClick}) {
    return (
        <div className="menu">
            <h3>Game Menu</h3>
            <p>Current Player: {currentPlayer}</p>
            <p>Total Revealed Cards: {totalRevealedCards}</p>
            <p>Текущий раунд: {currentRound}</p>
            <div onClick={onCatastropheClick} className="menu-card">
                <h4>Catastrophe Card:</h4>
                {catastropheCard && <img src={catastropheCard} alt="Catastrophe" />}
            </div>
            <div onClick={onBunkerCardClick} className="menu-card">
                <h4>Карты Бункера:</h4>
                <img src="../../../public/assets/images/Рубашка/Рубашка.png" alt="Карты бункера" />
            </div>
        </div>
    );
}

export default Menu;