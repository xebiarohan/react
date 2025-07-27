import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
    if(isEditing) {
      onChangeName(symbol, event.target.value);
    }
  }

  let playerNameField = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameField = <input type="text" value={playerName} onChange={handleNameChange} required />;
  }

  return (
    <li className={isActive ? 'active': undefined}>
      <span className="player">
        {playerNameField}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
