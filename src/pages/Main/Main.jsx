import axios from "axios";
import { useEffect, useState } from "react";
import Gallery from "../../componentes/Gallery/Gallery";

export default function Main() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const { data } = await axios("http://localhost:3000/characters");
      setCharacters(data)
    };

    getCharacters();
  }, []);

 

  return (
    <div className="App">
      <div className="App-header">
        <Gallery data={characters} />
      </div>
    </div>
  );
}


    // if (copyDefenseFighter.vitality > 0) {
    //   if (isInverted) {
    //     setFirstFigher(copyDefenseFighter);
    //     charactersFight(attackFighter, copyDefenseFighter);
    //   } else {
    //     setSecondFighter(copyDefenseFighter);
    //     charactersFight(defenseFighter, attackFighter);
    //   }
    // }