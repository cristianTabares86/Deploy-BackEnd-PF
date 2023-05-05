const axios = require("axios");
const { Videogame } = require("../models/Videogame");

const createBulkDB = async (req, res) => {
  try {
    let apiDB = await Videogame.findAll();
    if (apiDB.length) return apiDB; //? si tengo algo, no hago nada

    const response = await axios.get(
      "https://api.rawg.io/api/games?key=6df927ecdff443ffa74507df2223a6ad&page=1"
    ); // ? solicita los datos a la api externa

    const allGames = response.data.results.map((game) => ({
      //? trae los datos unificando el formato
      id: game.id,
      name: game.name,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      genre: game.genres.map((genre) => genre.name),
    }));

  const savedGames = await Videogame.bulkCreate(allGames);
    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  createBulkDB,
};
