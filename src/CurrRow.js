import React from 'react';

class CurrRow extends React.Component {
    render () {
        return (
            <>
                <td>{this.props.heading}</td>
                <td>{this.props.data}</td>
           </>
        )
    }

}

export default CurrRow;