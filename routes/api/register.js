const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const config = require("config");
const nodemailer = require("nodemailer");

const DataPemilih = require("../../models/DataPemilih");
const DataAktif = require("../../models/DataAktif");

router.post(
  "/",
  [
    check("NIK", "Ingrese su código UNI")
      .not()
      .isEmpty(),
    check("NKK", "Ingrese su código UNI") // NKK en Malayo (Indonesia)
      .not()
      .isEmpty(),
   // check("nama", "Apellidos y Nombres")
   //   .not()
   //   .isEmpty(),
    check("email", "Ingrese su correo electrónico").isEmail(),
    check("password", "Ingrese una contraseña de 6 caracteres o más").isLength(
      { min: 6 }
    )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { NIK, NKK, nama, tanggalLahir, email, password } = req.body;

    try {
      let user = await DataPemilih.findOne({ NIK: NIK, NKK:NKK}); // DataPemilih: Datos de los votantes (permitidos), busca solo por Código UNI
      let userTerdaftar = await DataAktif.findOne({ NIK }); // Busca el usuario registrado por DNI dento de Datos activos
      if (!user) { // Si el usuario no está registrado como permitido
        return res.status(400).json({
          errors: [
            {
              msg:
                "Sus datos no se han registrado como votante permanente, asegúrese de que NIK, No. KK, y su nombre se ha introducido correctamente"
            }
          ]
        });
      }

      if (userTerdaftar && user) { // Si el usuario está registrado como permitido y ya se registró en la aplicación
        return res.status(400).json({
          errors: [
            {
              msg: "Ya estás registrado, inicia sesión"
            }
          ]
        });
      }

      user = new DataAktif({ // Crea un objeto DataAktif para registrarlo en el sistema (Solo es necesario el NIK, email y password?)
        NIK,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10); // Genera la salt para añadirle al password

      user.password = await bcrypt.hash(password, salt); // Agrega la sal al password

      await user.save(); // Manda a guardar el usuario creado

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
        subject: "Confirmación de la cuenta de votación en las Elecciones Generales Virtuales UNI 2021", 
        text:
          "Haga clic en http://localhost:3000/activate para activar su cuenta", // Mover a localhost:3000/activate -- endpoint de ellos: https://pemilurt.herokuapp.com/activate
        html:
          '<p> Haga clic <a href="http://localhost:3000/activate"> aquí </a> para activar su cuenta </p>'
      });

      res.json({ msg: `Message sent, Message ID: ${info.messageId}` });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error del servidor");
    }
  }
);

module.exports = router;
