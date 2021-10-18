import React, { Component } from "react";
import ModalVision from "../modal/ModalVision";

import file_1 from "../../files/descarga.pdf";

class VotingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "#ccc",
      color: "rgb(51, 51, 51)"
    };
  }
  render() {
    return (
      <div
        className="candidateCard"
        style={{
          backgroundColor: this.props.backgroundColor,
          color: this.props.color
        }}
      >
        <div>
          <img
            style={{height: '150px'}}
            alt={"Foto " + this.props.name}
            src={this.props.image}
            className="candidate"
          />
          <h3 className="candidateName">{this.props.name}</h3>
          {/* <button className="vote-btn">Visi & Misi</button> 
                    <ModalVision
            name={this.props.name}
            visi={this.props.visi}
            misi={this.props.misi}
          />
          */}
          <a style={{margin: '5px', padding: '8px', color: 'black', background: 'white'}} href={this.props.file} target="_blank">Visión & Misión</a>
          <br />
          <br />
          <button
            className="vote-btn"
            onClick={this.props.onclick}
            disabled={this.props.isDisabled}
          >
            Votar por:  {this.props.name}
          </button>
        </div>
      </div>
    );
  }
}

export default VotingCard;
