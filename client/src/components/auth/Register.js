import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    NIK: "",
    NKK: "",
    nama: "",
    tanggalLahir: new Date(),
    email: "",
    password: "",
    password2: ""
  });

  const { NIK, NKK, nama, tanggalLahir, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeDate = date => setFormData({ ...formData, tanggalLahir: date });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Las contraseñas no coinciden", "danger");
    } else {
      register({ NIK, NKK, nama, tanggalLahir, email, password });
      setAlert(
        "Registro exitoso, revise su correo electrónico para activar su cuenta",
        "success"
      );
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  // nkk: family card number (nomor kartu keluarga)
  // nik: citizenship registration number (Nomor Induk Kependudukan)
  // ktp: Nomor Kartu Tanda Penduduk (Nomor KTP), because NIK is displayed on the KTP (citizen identity card).
  return (
    <Fragment>
      <h1 className="large text-primary">Registrarse</h1>
      <p className="lead">
        <i className="fas fa-user" /> Asegúrese de estar registrado como votante permanente, 
        reúnase con su representante de RT si aún no está registrado como votante permanente
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="DNI"
            name="NIK"
            value={NIK}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="No. KK"
            name="NKK"
            value={NKK}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre en la tarjeta de identificación"
            name="nama"
            value={nama}
            onChange={e => onChange(e)}
            required
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
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Registrasi" />
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
