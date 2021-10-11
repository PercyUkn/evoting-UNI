import React, { Component } from "react";
import web3 from "../../web3/web3";
import { infura, pk } from "../../web3/web3";
import voting from "../../voting";

export default class Hasil extends Component {
  state = {
    candidates: [],
    candidatesVotes: [],
    electionStarted: "loading",
    showResult: false
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
        <div>
          <h2>Resultados de la elección de rector de la UNI</h2>
          <table className="voteResult">
            <tbody>
              <tr>
                <th>Nombre del candidato</th>
                <th>Cantidad de votos</th>
              </tr>
              <tr>
                <td>{this.state.candidates[0]}</td>
                <td>{this.state.candidatesVotes[0]}</td>
              </tr>
              <tr>
                <td>{this.state.candidates[1]}</td>
                <td>{this.state.candidatesVotes[1]}</td>
              </tr>
              <tr>
                <td>{this.state.candidates[2]}</td>
                <td>{this.state.candidatesVotes[2]}</td>
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
