import { useState } from 'react';

function VotePhase({ players, onVote, onNextRound }) {
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);

    return (
        <div>
            <h2>Vote for a Player to Eliminate</h2>
            <select
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(parseInt(e.target.value))}
            >
                <option value={null}>Select a player</option>
                {players.map(
                    (player) =>
                        !player.isEliminated && (
                            <option key={player.id} value={player.id}>
                                Player {player.id}
                            </option>
                        )
                )}
            </select>
            <button onClick={() => onVote(selectedPlayerId)}>Vote</button>
            <button onClick={onNextRound}>Next Round</button>
        </div>
    );
}

export default VotePhase;
