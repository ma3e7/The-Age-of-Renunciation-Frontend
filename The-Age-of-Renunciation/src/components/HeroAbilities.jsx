import { useState, useRef, useEffect } from "react";
import { BentoTilt } from "./BentoTilt";

const HeroAbilities = ({ hero }) => {
  const abilities = hero.abilities || [];
  const scrollRef = useRef(null);
  const heroName = hero.hero_name.split(":")[0].trim();

  return (
    <section className="bg-storm-black py-20 px-5 md:px-20">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {abilities.map((ability, index) => (
          <BentoTilt
            key={ability.id}
            className="shrink-0 w-80 md:w-96 rounded-2xl overflow-hidden shadow-lg border-2 border-fog-grey"
            style={{ scrollSnapAlign: "center" }}
          >
            <img
              src={`/img/${heroName}-A${index + 1}.png`}
              alt={ability.ability_name}
              className="w-full h-64 object-cover border-2 border-fog-grey rounded-xl"
            />
            <div className="p-4 bg-storm-black">
              <h3 className="text-fog-grey font-skranji text-2xl mb-2">
                {ability.ability_name}
              </h3>
              <p className="text-fog-grey/80">{ability.ability_description}</p>
            </div>
          </BentoTilt>
        ))}
      </div>
    </section>
  );
};

export default HeroAbilities;
