const { Router } = require("express");
const express = require("express");
const createGame = require("../controllers/createGame");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
 
  let { id, name, released, rating, platforms, genre } = req.body;
  try {
    let resultado = await createGame({
      id,
      name,
      released,
      rating,
      platforms,
      genre,
    });
    res.status(200).json(`Su juego se ha creado con éxito. \n\nGracias por compartirlo!.`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;