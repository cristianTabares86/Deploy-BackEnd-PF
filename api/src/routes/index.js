const { Router } = require('express');
const axios = require("axios")

// Importar todos los routers;
const router = Router();
const getGamesNameRouter = require("./getGamesName");
const postGamesRouter = require("./postGames");
const getGamesIdRouter = require("./getGamesId");
const getGenresRouter = require("./getGenres");
const deleteGameRouter = require("./deleteGame");
const putGameRouter = require("./putGame");
const  { Videogame }  = require("../db")

const createBulkDB = async (req, res) => {
    try {  
        const response = await axios.get(
            "https://api.rawg.io/api/games?page_size=10&key=6df927ecdff443ffa74507df2223a6ad&page_size=40"); // ? solicita los datos a la api externa
            
            const allGames = response.data.results.map((game) => ({//? trae los datos unificando el formato
                id: game.id,
                name: game.name,
                rating: game.rating,
                platforms: game.platforms.map((platform) => platform.platform.name),        
                released: game.released,
                image: game.background_image,
                genre: game.genres.map((genre) => genre.name),
            }));
            const savedGames = await Videogame.bulkCreate(allGames);
            return res.status(200).json(savedGames);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// const validate = (req, res, next) => {
//     const { name, genre } = req.body
//     if( !name || !genre ) {
//         res.status(400).json({error: "Faltan datos obligatortios"})
//     } else {
//         next();
//     }
//     }


// Configurar los routers
router.use("/games", getGamesNameRouter);
router.use("/games/update", putGameRouter);
router.use("/games", postGamesRouter);
router.use("/games/createBulkDB", createBulkDB);
router.use("/games", getGamesIdRouter);
router.use("/genres", getGenresRouter);
router.use("/games", deleteGameRouter);

module.exports = router;