const { Videogame, Genre } = require("../db");

async function createGame({
  name,
  released,
  rating,
  platforms,
  genre,
}) {
  if (!name || !genre)
    throw new Error("El nombre y el genero deben estar completos");

  let resultado = await Videogame.create({
    name,
    released,
    rating,
    platforms,
    genre,
  });

  for (const genre of genres) {
    let genres = await Genre.findOne({
      where: {
        title: genre,
      },
    });

    await resultado.addGenre(genres);
  }
}

module.exports = createGame;
