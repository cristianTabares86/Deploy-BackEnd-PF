const { Videogame, Genre } = require("../db");

async function createGame({
  id,
  name,
  released,
  rating,
  platforms,
  genre,
}) {
  if (!name || !genre)
    throw new Error("El nombre y el genero deben estar completos");

  let resultado = await Videogame.create({
    id,
    name,
    released,
    rating,
    platforms,
    genre,
  });

  for (const gen of genre) {
    let genres = await Genre.findOne({
      where: {
        name: gen,
      },
    });

    await resultado.addGenre(genres);
  }
}

module.exports = createGame;
