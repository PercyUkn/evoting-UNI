const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const bcrypt = require("bcryptjs");

const DataAktif = require("../../models/DataAktif");

router.get("/", auth, async (req, res) => {
  try {
    const user = await DataAktif.findById(req.user.id).select("-password"); // El email envía un get a /activate, faltaría ver si se genera un token temporal usando JWT
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("NIK", "Ingrese su código UNI").exists(),
    check("password", "Ingresa tu contraseña").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { NIK, password } = req.body;

    try {
      let user = await DataAktif.findOne({ NIK }); // Busca si el usuario se registró en la BD de los activos
      if (!user) { //Si el ususario no está registrado
        return res
          .status(400)
          .json({ errors: [{ msg: "Su Código UNI o contraseña es incorrecta" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) { //Si la contraseña es incorrecta
        return res
          .status(400)
          .json({ errors: [{ msg: "Su Código UNI o contraseña es incorrecta" }] });
      }

      await DataAktif.findOneAndUpdate({ NIK }, { confirmed: true }); // Actualiza el campo confirmed, esto es lo que realmente utiliza para "activar" al usuario
      // res.json({ msg: "Tu cuenta ha sido confirmada" });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // Envía el JWT como respuesta
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

module.exports = router;
