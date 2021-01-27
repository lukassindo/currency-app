import React from "react";

class CurrRow extends React.Component {
  constructor(props) {
    super(props);
    this.sendData = this.sendData.bind(this);
    
}

  sendData() {
    this.props.getData(this.props.curr);
  }

  render() {
    return (
      <>
        <td>{this.props.heading}</td>
        <td>{this.props.data}</td>
        <td>{this.props.index !==0 && <button onClick={this.sendData}>Weekly data</button>}</td>
      </>
    );
  }
}

export default CurrRow;
