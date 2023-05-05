const { Videogame, Genre } = require("../db");

async function createGame({
  name,
  released,
  rating,
  platforms,
  genres,
}) {
  if (!name || !genres)
    throw new Error("El nombre y el genero deben estar completos");

  let resultado = await Videogame.create({
    name,
    released,
    rating,
    platforms,
    genres,
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
