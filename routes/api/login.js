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
    const user = await DataAktif.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("NIK", "Ingrese su código UNI").exists(), // OJO: NIK está atado al name del input, primero cambiar ahí, luego cambiar aquí, sino da error.
    check("password", "Ingrese su contraseña").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { NIK, password } = req.body;

    try {
      let user = await DataAktif.findOne({ NIK });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Su código UNI o contraseña es incorrecta" }] }); // NIK = Código UNI 
      }

      if (user.confirmed == false) { // Verifica el campo confirmed, se actualiza con el endpoint /activate
        return res
          .status(400)
          .json({ errors: [{ msg: "La cuenta no ha sido activada" }] });
      }

      if (user.hasVote == true) { // Verifica si el usuario ya votó
        return res
          .status(400)
          .json({ errors: [{ msg: "Usted ya ha votado" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) { // Contraseña incorrecta
        return res
          .status(400)
          .json({ errors: [{ msg: "Su código UNI o contraseña es incorrecta" }] });
      }

      

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
          res.json({ token });
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
