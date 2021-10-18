import React, { Component } from "react";
import web3 from "../../web3/web3";
import { infura, pk } from "../../web3/web3";
import voting from "../../voting";

import lista_1 from "../../img/uni/lista_1.png";
import lista_2 from "../../img/uni/lista_2.png";
import lista_3 from "../../img/uni/lista_3.png";
import lista_4 from "../../img/uni/lista_4.png";
import lista_6 from "../../img/uni/lista_6.png";
import lista_7 from "../../img/uni/lista_7.png";

export default class Hasil extends Component {
  /*
  foto = {
    lista_1,
    lista_2,
    lista_3,
    lista_4,
    lista_6,
    lista_7
  }
 */
  state = {
    candidates: [

    ],
    candidatesVotes: [
  
    ],
    electionStarted: false,
    showResult: true
  };

  async componentDidMount() {
    let candidateObject;
    const numberOfCandidates = await voting.methods.get_num_candidates().call();
    const candidates = [];
    const candidatesVotes = [];
    for (let i = 0; i < numberOfCandidates; i++) {
      candidateObject = await voting.methods.get_candidate(i).call();
      candidates[i] = candidateObject._candidate;
      candidatesVotes[i] = candidateObject._votes;
    }
    this.setState({ candidates });
    this.setState({ candidatesVotes });
    const electionStarted = await voting.methods.electionStarted().call();
    this.setState({ electionStarted });
  }

  render() {
    if (this.state.electionStarted === "loading") {
      console.log(this.state.electionStarted)
      return null;
    } else if (this.state.electionStarted === false) {
      return (
        <div style={{'margin': '40px 0px'}}>                   
          <h2 style={{'margin-bottom': '40px'}}>Resultados de la elección de rector de la UNI</h2>
          <table className="voteResult">
            <tbody>
              <tr>
                <th>Lista</th>
                <th>Nombre del candidato</th>
                <th>Cantidad de votos</th>
              </tr>
              <tr>
                <td><img src={lista_1} style={{'height': '80px', width: 'auto'}}/></td>                
                <td>{this.state.candidates[0]}</td>
                <td>{this.state.candidatesVotes[0]}</td>
              </tr>
              <tr>
                <td><img src={lista_2} style={{'height': '80px', width: 'auto'}}/></td>  
                <td>{this.state.candidates[1]}</td>
                <td>{this.state.candidatesVotes[1]}</td>
              </tr>
              <tr>
                <td><img src={lista_3} style={{'height': '80px', width: 'auto'}}/></td>                 
                <td>{this.state.candidates[2]}</td>
                <td>{this.state.candidatesVotes[2]}</td>
              </tr>
              <tr>
                <td><img src={lista_4} style={{'height': '80px', width: 'auto'}}/></td>  
                <td>{this.state.candidates[3]}</td>
                <td>{this.state.candidatesVotes[3]}</td>
              </tr>
              <tr>
                <td><img src={lista_6} style={{'height': '80px', width: 'auto'}}/></td> 
                <td>{this.state.candidates[4]}</td>
                <td>{this.state.candidatesVotes[4]}</td>
              </tr>
              <tr>
                <td><img src={lista_7} style={{'height': '80px', width: 'auto'}}/></td> 
                <td>{this.state.candidates[5]}</td>
                <td>{this.state.candidatesVotes[5]}</td>
              </tr>                                          
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <h2>
            Los resultados de la elección a rector de la UNI se anunciarán una vez finalizado
            tiempo de elecciones
          </h2>
        </div>
      );
    }
  }
}
