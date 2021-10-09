import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Elecciones generales virtuales</h1>
          <p className="lead">UNI 2021</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Registrase
            </Link>
            <Link to="/login" className="btn btn-light">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
