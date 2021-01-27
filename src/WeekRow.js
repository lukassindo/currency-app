import React from "react";

class WeekRow extends React.Component {
 

  render() {


    return (
      <tr>
         {this.props.data.map((item, index) => (
           <td key={index}>{item}</td>
         ))}
        
      </tr>
    );
  }
}

export default WeekRow;