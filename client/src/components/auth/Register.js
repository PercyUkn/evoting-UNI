import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => { // Qué función llama a esta función?
  const [formData, setFormData] = useState({
    NIK: "",
    NKK: "",
    nama: "",
    tanggalLahir: new Date(),
    email: "",
    password: "",
    password2: ""
  });

  //NIK = DNI citizenship registration number (NIK)
  //NKK = family card number (nomor kartu keluarga, NKK)
  const { NIK, NKK, nama, tanggalLahir, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeDate = date => setFormData({ ...formData, tanggalLahir: date });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Las contraseñas no coinciden", "danger");
    } else {
      register({ NIK, NKK, nama, tanggalLahir, email, password }); // A dónde envía esta función? a /api/register.js
      setAlert(
        "Registro exitoso, revise su correo electrónico para activar su cuenta",
        "success"
      );
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Registrarse</h1>
      <p className="lead">
        <i className="fas fa-user" /> 
        Asegúrese de estar registrado como votante, caso contrario,
        reúnase con su representante del Centro de Estudiantes para registrarse como votante.
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
          <input
            type="text"
            id="codigoNKK"
            placeholder="DNI"
            name="NKK"
            value={NKK}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
           
            type="text"
            placeholder="Código UNI"
            name="NIK"
            value={NIK}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Apellidos y Nombres"
            name="nama"
            value={nama}
            onChange={e => onChange(e)}
            type="hidden"
          />
        </div>
        <div className="form-group">
          <DatePicker
            selected={formData.tanggalLahir}
            onChange={changeDate}
            dateFormat="dd/MM/yyyy"
            name="tanggalLahir"
            value={tanggalLahir}
          />
          <small className="form-text">Fecha de nacimiento</small>
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmar password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Registrase" />
      </form>
      <p className="my-1">
      ¿Ya registrado? <Link to="/login">Iniciar sesión</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
