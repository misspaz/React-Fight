import axios from "axios";
import { useEffect, useState } from "react";
import "../Main/Main.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext/AppContext";

export default function Main() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const getCharacters = async () => {
    const allCharacters = await axios(`http://localhost:3000/characters`);
    setCharacters(allCharacters.data);
  };

    // console.log(characters);

  useEffect(() => {
    getCharacters();
  }, []);

  const handleCharacterClick = (character) => {
    if (
      selectedCharacters.length < 2 &&
      !selectedCharacters.includes(character)
    ) {
      setSelectedCharacters((preSelected) => [...preSelected, character]);
    }
  };

  function toggleBorder(element) {
    element.classList.toggle("clicked");
  }

  return (
    <AppContext.Provider value={{ characters }}>
      <div className="p-all-characters hover01">
        {characters.map((character) => (
          <div
            className={`p-character ${
              selectedCharacters.includes(character) ? "selected" : ""
            }`}
            key={character.name}
            onClick={() => handleCharacterClick(character)}
          >
            <img
              onClick={() => toggleBorder(this)}
              className="p-character__img clicked"
              src={character.avatar}
              alt={character.name}
            />
            <h2 className="p-character__name">{character.name}</h2>
            <h4>{character.vitality}</h4>
          </div>
        ))}
      </div>
      <div>
        {selectedCharacters.length === 2 && (
          <Link to="/fightpage">
            <button>¡Fight!</button>
          </Link>
        )}
      </div>
    </AppContext.Provider>
  );
}
