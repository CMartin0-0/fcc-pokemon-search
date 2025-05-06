import "./style.css";
const pkmnSearchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const imgSpriteContainer = document.getElementById("sprite-container");
const sprite = document.getElementById("sprite");
const pkmnTypeContainer = document.getElementById("types");
const pkmnWeight = document.getElementById("weight");
const pkmnHeight = document.getElementById("height");
const pkmnName = document.getElementById("pokemon-name");
const pkmnId = document.getElementById("pokemon-id");
const pkmnHp = document.getElementById("hp");
const pkmnAtk = document.getElementById("attack");
const pkmnDef = document.getElementById("defense");
const pkmnSpAtk = document.getElementById("special-attack");
const pkmnSpDef = document.getElementById("special-defense");
const pkmnSpd = document.getElementById("speed");

const pkmnData = async () => {
  try {
    //format input
    const reg1 = /[^a-zA-Z0-9_]\s/gim;
    const reg2 = /\s/g;
    const reg3 = /[♂]/;
    const reg4 = /[♀]/;
    const formattedInput = pkmnSearchInput.value
      .toLowerCase()
      .trim()
      .replace(reg1, "")
      .replace(reg2, "-")
      .replace(reg3, "-m")
      .replace(reg4, "-f");
    //fetch pokemon data

    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${formattedInput}`,
    );
    const data = await res.json();
    console.log(data);

    //set pokemon info

    pkmnName.textContent = `${data.name.toUpperCase()}`;
    pkmnId.textContent = `#${data.id}`;
    pkmnHeight.textContent = `Height: ${data.height}`;
    pkmnWeight.textContent = `Weight: ${data.weight}`;
    imgSpriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}"/>`;
    pkmnTypeContainer.innerHTML = data.types
      .map(
        (obj) =>
          `<span class="type ${
            obj.type.name
          }">${obj.type.name.toUpperCase()}</span>`,
      )
      .join("");

    //set pokemon stats

    pkmnHp.textContent = `${data.stats[0].base_stat}`;
    pkmnAtk.textContent = `${data.stats[1].base_stat}`;
    pkmnDef.textContent = `${data.stats[2].base_stat}`;
    pkmnSpAtk.textContent = `${data.stats[3].base_stat}`;
    pkmnSpDef.textContent = `${data.stats[4].base_stat}`;
    pkmnSpd.textContent = `${data.stats[5].base_stat}`;
  } catch (error) {
    clearDisplay();
    alert("Pokémon not found");
    console.error(error);
  }
};

const clearDisplay = () => {
  //remove sprite

  if (sprite) {
    sprite.remove();
  }

  //clear pokemon display / stats

  pkmnName.textContent = "";
  pkmnId.textContent = "";
  pkmnHeight.textContent = "";
  pkmnWeight.textContent = "";
  pkmnTypeContainer.innerHTML = "";
  pkmnHp.textContent = "";
  pkmnAtk.textContent = "";
  pkmnDef.textContent = "";
  pkmnSpAtk.textContent = "";
  pkmnSpDef.textContent = "";
  pkmnSpd.textContent = "";
};

searchBtn.addEventListener("click", pkmnData);

pkmnSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    pkmnData();
  }
});
