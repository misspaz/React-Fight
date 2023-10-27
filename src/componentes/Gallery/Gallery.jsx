import { useState } from "react";
import "../Gallery/Gallery.scss";

export default function Gallery({ data }) {
  let totalDamage = 0;

  const [firstFighter, setFirstFighter] = useState(null);
  const [secondFighter, setSecondFighter] = useState(null);

  const selectedFighters = (character) => {
    if (!firstFighter) {
      setFirstFighter(character);
      console.log("El personaje 1 es ", character);
    } else {
      setSecondFighter(character);
      console.log("El personaje 2 es ", character);
    }
    
  };

  const charactersFight = (fighter1, fighter2, isInverted) => {
    const fighter1Damage = fighter1.damage;
    fighter1Damage.map((dice) => {
      
      const arrayNumbers = dice.split("d");
      const [num1, num2] = arrayNumbers;

      for (let index = 0; index < num1; index++) {
        let resultadoCaras = Math.floor(Math.random() * num2) + 1;
        totalDamage += resultadoCaras;
      }

      if (totalDamage === fighter1.critic) {
        
        let criticResult = totalDamage * 2;
        const defenseNumber = fighter2.defense;
        let totalResult = defenseNumber - criticResult;
        setSecondFighter(fighter2.vitality - totalResult);
      } else {
        
        const defenseNumber = fighter2.defense;
        let totalResult = defenseNumber - totalDamage;
        setSecondFighter(fighter2.vitality - totalResult);
      
      }
      
      if (fighter2.vitality <= 0) {
        console.log("Derrota");
        
      } else {
        if (isInverted) {
          setFirstFighter(fighter2);
          charactersFight(fighter1, fighter2, false);
        } else {
          setSecondFighter(fighter2);
          charactersFight(fighter2, fighter1, true);
        }
      }
      
    }
    );
    return;
  };

  return (
    <div className="p-all-characters">
      {data.map((character, index) => (
        <div
          onClick={() => selectedFighters(character)}
          className="p-character"
          key={index}
        >
          <img
            className="p-character__img"
            src={character.avatar}
            alt={character.name}
          />
          <h2 className="p-character__name">{character.name}</h2>
          <h4>{character.vitality}</h4>
        </div>
      ))}
      {firstFighter && secondFighter && (
        <button
          onClick={() => charactersFight(firstFighter, secondFighter, false)}
        >
          Fight!
        </button>
      )}
    </div>
  );
}
