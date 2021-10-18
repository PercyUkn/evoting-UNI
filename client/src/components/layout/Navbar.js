import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo_uni from "../../img/uni/logo-uni.png";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/hasil">Resultados</Link>
      </li>
      <li>
        <Link to="/instruksi">Instrucciones</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" /> Cerrar sesión
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/hasil">Resultados</Link>
      </li>
      <li>
        <Link to="/instruksi">Instrucciones</Link>
      </li>
      <li>
        <Link to="/register">Registro</Link>
      </li>
      <li>
        <Link to="/login">Iniciar sesión</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar" style={{background: '#E6E6E6'}}>
        <img
        style={{height: '80px', width: 'auto'}}
        src={logo_uni}
        />
        <h1>
          <Link to="/">Elecciones UNI</Link>
        </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
