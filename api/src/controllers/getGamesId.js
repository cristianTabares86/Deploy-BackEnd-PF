require("dotenv").config();
const { Videogame, Genre } = require("../db");

async function searchId(id) {
    let resultado = await Videogame.findByPk(id, {      
        include: {
          model: Genre,
          attributes: ["name"],
          through: {attributes: []},
        },      
    });
    if (!resultado) throw new Error(`No existen juegos con el id: ${id}`);
    return resultado;
  }


module.exports = { searchId };