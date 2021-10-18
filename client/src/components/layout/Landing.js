import React from "react";
import { Link } from "react-router-dom";
import logo_onpe from "../../img/uni/logo-onpe.png";
import logo_comite_electoral from "../../img/uni/logo-comite-electoral.png";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">      
        <div className="landing-inner"> 
        <div style={{background: 'white', width: '100%'}}>
          <img style={{height: '200px', width: 'auto'}}
          src={logo_onpe}/>
          <img style={{height: '200px', width: 'auto'}}
          src={logo_comite_electoral}/>
        </div>                     
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
