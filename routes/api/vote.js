const express = require("express");
const router = express.Router();
const config = require("config");

const DataPemilih = require("../../models/DataPemilih");
const DataAktif = require("../../models/DataAktif");

router.post(
  "/",
  async (req, res) => {
    const { NIK } = req.body;
    console.log("Servidor")
    console.log(NIK)

    try {
      let user = await DataAktif.findOne({ NIK });
      console.log(user);
      user.hasVote = true;
      await user.save();
      console.log(user);
      //await DataAktif.findOneAndUpdate({ NIK:NIK }, { conhasVotefirmed: true });
      res.status(200).send("El usuario ha votado");
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).send("Error del servidor");
    }
  }
);

router.get(
  "/reset",
  async (req, res) => {
    const { NIK } = req.body;
    console.log("Servidor")

    try {
      
      users = await DataAktif.find({});
      console.log(users);
      users.forEach(element => {
        element.hasVote=false;
        element.save();
      });

      res.status(200).send("Reiniciado todo");
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).send("Error del servidor");
    }
  }
);

module.exports = router;
