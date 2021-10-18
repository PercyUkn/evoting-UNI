import React, { Component } from "react";
import web3 from "../../web3/web3";
import { infura, pk } from "../../web3/web3";
import voting from "../../voting";
import VotingCard from "../layout/VotingCard";
import { Visi1, Visi2, Visi3, Misi1, Misi2, Misi3 } from "../modal/VisiMisi";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

// Un poco de acoplamiento y malas prácticas!!!
//const DataAktif = require("../../../../models/DataAktif");
//let userDetails = JSON.parse(localStorage.getItem('user'));
//await DataAktif.findOneAndUpdate({ NIK }, { hasVote: true });

class Dashboard extends Component {
  state = {
    candidates: [],
    value: "",
    message: "",
    confirmVote: false,
    voted: false
  };

  voteValue = name => {
    this.setState({
      value: name
    });
    console.log(name);
    console.log("Value: ", this.state.value);
  };

  async componentDidMount() {
    const numberOfCandidates = await voting.methods.get_num_candidates().call();
    const candidates = [];
    for (let i = 0; i < numberOfCandidates; i++) {
      candidates[i] = await voting.methods.candidates(i).call();
    }
    this.setState({ candidates });
  }

  confirmingVote = async event => {
    event.preventDefault();
    this.setState({ confirmVote: true });
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ message: "En progreso, espere" });
    //const account = "0xbD5f9982c0679BBc30DC27CFc6F44695c8D28e06" // Ganache "0x7553Bfa72d8942141467E113B165B651Dcb01fE0"; (Coincide con el del AdminPanel.js, no con el de voting.js)
    const account = "0xB6F966B122a93DBbb1bD7cf2ea3BCB4ED1922c4D" // Gorli, address del Admin
    await voting.methods.vote(this.state.value).send({
      from: account,
      gasLimit: "1000000"
    });
    
    
    
    // Aquí debería poner hasVote a true en la entidad del usuario logueado
    this.setState({ message: "Has elegido " + this.state.value });
    this.setState({voted: true});

    // Enviando un post para registrar al ususario como que ha votado
    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
     // body: JSON.stringify({NIK: localStorage.getItem('codigoo_UNI')})
      body: JSON.stringify({NIK: localStorage.getItem('codigo_UNI')})
    }
    console.log("Cliente");
    console.log(request);
    fetch('http://localhost:3000/api/vote',request).then(response => console.log(response));

    setTimeout(function() {
      window.location.replace('http://localhost:3000/hasil');
    }, 7000);
  };

  render() {
    return (
      <div className="formVoting">
        <h2>Elección del rector de la UNI</h2>
        <hr />
        <VotingCard
          name={this.state.candidates[0]} // Tra el nombre del candidato 0
          image="https://1.bp.blogspot.com/_BSRFkkxuSEI/Sj5_G8xpCSI/AAAAAAAAEO8/2oxcKT4w8pE/s1600-h/lopez1.jpg"
          backgroundColor={
            this.state.value === this.state.candidates[0] ? "#f00" : "#ccc"
          }
          color={
            this.state.value === this.state.candidates[0]
              ? "#fff"
              : "rgb(51, 51, 51)"
          }
          width="120px"
          onclick={() => this.voteValue(this.state.candidates[0])}
          visi={Visi1}
          misi={Misi1}
          isDisabled={this.state.confirmVote}
        />
        <VotingCard
          name={this.state.candidates[1]}
          image="https://www.ulima.edu.pe/sites/default/files/styles/230x230/public/pictures/picture-752-1381189478.jpg" // Goytendia, debería ir Vergara Sotomayor
          backgroundColor={
            this.state.value === this.state.candidates[1] ? "#f00" : "#ccc"
          }
          color={
            this.state.value === this.state.candidates[1]
              ? "#fff"
              : "rgb(51, 51, 51)"
          }
          width="120px"
          onclick={() => this.voteValue(this.state.candidates[1])}
          visi={Visi2}
          misi={Misi2}
          isDisabled={this.state.confirmVote}
        />
        <VotingCard
          name={this.state.candidates[2]}
          image="http://1.bp.blogspot.com/_amwwCeRbLy8/Skx_Kn70krI/AAAAAAAAAqk/xGsOJK7bLGg/s1600-h/25331980.jpg"
          backgroundColor={
            this.state.value === this.state.candidates[2] ? "#f00" : "#ccc"
          }
          color={
            this.state.value === this.state.candidates[2]
              ? "#fff"
              : "rgb(51, 51, 51)"
          }
          width="120px"
          onclick={() => this.voteValue(this.state.candidates[2])}
          visi={Visi3}
          misi={Misi3}
          isDisabled={this.state.confirmVote}
        />

        <div>
          <button className="confirm-vote" onClick={this.confirmingVote}>
            Confirmar Voto {this.state.value}
          </button>
        </div>
        <button className="confirm-vote" onClick={this.onSubmit} disabled={this.state.voted}>
          Enviar
        </button>
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default Dashboard;
