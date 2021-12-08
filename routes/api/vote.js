const express = require("express");
const router = express.Router();
const config = require("config");
const nodemailer = require("nodemailer");

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

      const transporter = nodemailer.createTransport({ // Esto es para enviar el email
        service: "Gmail",
        tls: { rejectUnauthorized: false },
        auth: {
          user: config.adminEmail, // revisar https://github.com/lorenwest/node-config (Config files) Está en default.json
          pass: config.emailPass // revisar https://github.com/lorenwest/node-config (Config files
        }
      });

      const info = await transporter.sendMail({
        from: '"Comité Electoral UNI" <seguridad.informatica.uni.21.2@gmail.com>',
        to: user.email,
        subject: "Confirmación de voto en las Elecciones Generales Virtuales UNI 2021", 
        text:
          "Gracias por haber participado en las elecciones", // Mover a localhost:3000/activate -- endpoint de ellos: https://pemilurt.herokuapp.com/activate
        html:
          'Gracias por haber participado en las elecciones'
      });

      console.log(user);
      //await DataAktif.findOneAndUpdate({ NIK:NIK }, { conhasVotefirmed: true });

      res.json({ msg: `Message sent, Message ID: ${info.messageId}` });
  
      //res.status(200).send("El usuario ha votado");
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
