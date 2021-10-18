import React, { Component } from "react";
import MenuImg from "../../img/Menu2.PNG";
import RegisterImg from "../../img/Registrasi2.PNG";
import AktivasiImg from "../../img/Aktivasi.jpeg";
import LoginImg from "../../img/Login2.PNG";
import DashboardImg from "../../img/Dashboard2.PNG";
import DashboardHighlightImg from "../../img/Dashboard-highlighted2.PNG";
import DashboardVoteWaitingImg from "../../img/Dashboard-vote-waiting.PNG";
import DashboardVoteDoneImg from "../../img/Dashboard-vote-done.PNG";
export default class Instruksi extends Component {
  render() {
    return (
      <div>
        <ol className="instruction-list">
          <li>
            <h4 className="instruction">
            Asegúrese de estar registrado como votante para las elecciones de la UNI, reúnase con su representante de RT si aún no está registrado como votante permanente
            <br></br>(Cambiar por requisito propio de la UNI)
            </h4>
          </li>
          <li>
            <h4 className="instruction">
              En el menú principal, haga clic en Registrarse para registrarse
            </h4>
            <img
              src={MenuImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
                Regístrese ingresando su DNI, código UNI, apellidos y nombres, fecha de nacimiento, correo electrónico y contraseña.
            </h4>
            <img
              src={RegisterImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
            Active su cuenta confirmando el email enviado al correo electrónico usado en el registro.
            </h4>
            <img
              src={AktivasiImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
            Inicie sesión ingresando el código UNI y la contraseña utilizadas durante el registro.
            </h4>
            <img
              src={LoginImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Elija el candidato de su elección, también puede ver el plan de trabajo del candidato existente antes de elegir.
            </h4>
            <img
              src={DashboardImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Confirme su elección presionando: "Confirmar voto"
            </h4>
            <img
              src={DashboardHighlightImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Envíe su elección y espere hasta que el sistema termine de procesarlo
            </h4>
            <img
              src={DashboardVoteWaitingImg}
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
          </li>
          <li>
            <h4 className="instruction">
              Puede ver los resultados de las elecciones una vez finalizadas las elecciones.
            </h4>
          </li>
        </ol>
      </div>
    );
  }
}
