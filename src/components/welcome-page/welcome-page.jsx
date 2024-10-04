import { useState } from 'react';

function WelcomePage({ onStart }) {
    const [numPlayers, setNumPlayers] = useState(0);

    const handleChange = (e) => {
        setNumPlayers(parseInt(e.target.value));
    };

    const handleSubmit = () => {
        if (numPlayers > 0 && numPlayers <= 30) {
            onStart(numPlayers);
        }

    };

    return (
        <div className='welcome'>
            <h2>Select Number of Players</h2>
            <input type="number" value={numPlayers} onChange={handleChange} min="2" />
            <button onClick={handleSubmit}>Start Game</button>
        </div>
    );
}

export default WelcomePage;