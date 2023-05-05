// const { Router } = require("express");
// const express = require ("express");
// const { Videogame } = require ("../models/Videogame")
// const { createBulkDB } = require ("../controllers/dataBulkLoad")
// const router = Router();

// router.use(express.json());

// router.post("/dataBulkLoad", async (req, res) => {
//     try {
//       createBulkDB();
//         const savedGames = await Videogame.bulkCreate(allGames);
//         return res.status(200).json(savedGames);
//       } catch (error) {
//         return res.status(500).json({ message: "Error interno del servidor" })
// }})


// module.exports = router;