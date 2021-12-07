import React, { Component } from "react";
import web3 from "../../web3/web3";
import voting from "../../web3/voting";


class AdminPanel extends Component {
  state = { // Este es el objeto state, referenciado durante toda este componentes
    //adminAddress: "0xbD5f9982c0679BBc30DC27CFc6F44695c8D28e06",// <-- El de ganache, 0x7553bfa72d8942141467e113b165b651dcb01fe0 (el que ya venía)
    adminAddress:"0xB6F966B122a93DBbb1bD7cf2ea3BCB4ED1922c4D", // <-- El de gorli
    account: [],
    value: "",
    registerMsg: "",
    startMsg: "",
    stopMsg: "",
    resetMsg: ""
  };

  // Inserta los datos de la cuenta de Ethereum
  async componentDidMount() {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      //const account = await ethereum.enable(); // Cambiando porque parece deprecated selectedAddress()
      const account = await window.web3.accounts
      this.setState({ account });
    } else if (window.web3) {
      const account = await window.web3.accounts//web3.eth.getAccounts();
      this.setState({ account });
    }
  }

  regisCandidate = async event => {
    event.preventDefault();
    console.log(this.state.value);
    if (window.ethereum) { // Misma funcionalidad tanto con window.ethereum como window.web3
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ registerMsg: "Siendo procesado" });
      await voting.methods.register_candidate(this.state.value).send({
        from: account[0]
      });
      this.setState({ registerMsg: this.state.value + " Registrado exitosamente" });
    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ registerMsg: "Siendo procesado" });
      await voting.methods.register_candidate(this.state.value).send({ // registra el candidato (solo pasa el ID del candidato, no?)
        from: account[0]
      });
      this.setState({ registerMsg: this.state.value + " Registrado exitosamente" });
    }
  };

  startVoting = async event => {
    event.preventDefault();
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ startMsg: "Siendo procesado" });
      await voting.methods.startElection().send({
        from: account[0]
      });
      this.setState({ startMsg: "Comienza la votación" });
    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ startMsg: "Siendo procesado" });
      await voting.methods.startElection().send({
        from: account[0]
      });
      this.setState({ startMsg: "Comienza la votación" });
    }
  };

  stopVoting = async event => {
    event.preventDefault();
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ stopMsg: "Siendo procesado" });
      await voting.methods.stopElection().send({
        from: account[0]
      });
      this.setState({ stopMsg: "Votación detenida" });
    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ stopMsg: "Siendo procesado" });
      await voting.methods.stopElection().send({
        from: account[0]
      });
      this.setState({ stopMsg: "Votación detenida" });
    }
  };

  resetVoting = async event => {
    event.preventDefault();
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const account = await ethereum.enable();
      this.setState({ resetMsg: "Siendo procesado" });
      await voting.methods.reset().send({
        from: "0xB6F966B122a93DBbb1bD7cf2ea3BCB4ED1922c4D"
      });

      fetch('http://localhost:5000/api/vote/reset').then(response => console.log(response))

      this.setState({ resetMsg: "Restablecimiento exitoso" });

    } else if (window.web3) {
      const account = await web3.eth.getAccounts();
      this.setState({ resetMsg: "Siendo procesado" });
      await voting.methods.reset().send({
        from: account[0]
      });
      fetch('http://localhost:5000/api/vote/reset').then(response => console.log(response))
      this.setState({ resetMsg: "Restablecimiento exitoso" });
    }
  };

  render() {
    if (true) { // Visualiza la pantalla si la dirección del adminAddress es la del address de Ethereum this.state.account[0] === this.state.adminAddress
      return (
        <div className="formVoting">
          <div className="candidateCard">
            <form onSubmit={this.regisCandidate}>
              <h3>Registro de candidatos</h3>
              
              <input
                type="text"
                placeholder="Nombre del candidato"
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
                required
              />
              <input type="submit" value="Registrar" />
            </form>
            <h3>{this.state.registerMsg}</h3>
          </div>

          <div className="candidateCard">
            <form onSubmit={this.startVoting}>
              <h3>Comenzar votación</h3>
              <input type="submit" value="Comenzar" />
            </form>
            <h3>{this.state.startMsg}</h3>
          </div>

          <div className="candidateCard">
            <form onSubmit={this.stopVoting}>
              <h3>Detener votación</h3>
              <input type="submit" value="Detener" />
            </form>
            <h3>{this.state.stopMsg}</h3>
          </div>

          <div className="candidateCard">
            <form onSubmit={this.resetVoting}>
              <h3>Reestablecer votación</h3>
              <input type="submit" value="Reestablecer" />
            </form>
            <h3>{this.state.resetMsg}</h3>
          </div>
        </div>
      );
    } else if (web3 === "no eth") {
      return null;
    } else {
      return null;
    }
  }
}

export default AdminPanel;
