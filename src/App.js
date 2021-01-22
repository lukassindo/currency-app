import React from "react";
import logo from "./currency.jpg";
import "./App.css";
import CurrencyService from "./services/currency";
import CurrRow from "./CurrRow";

class App extends React.Component {
  HEADING = ["DATE", "PLN/USD", "PLN/EUR", "PLN/GBP", "PLN/CZK", "PLN/CAD"];
  constructor(props) {
    super(props);

    this.state = {
      currData: [],
      getData: false,
      error: false,
    };
  }

  async componentDidMount() {
    try {
      const currency = await CurrencyService.getCurrences();
      console.log(typeof currency);
      console.log(currency);

      this.setState({ currData: currency });
    } catch (err) {
      console.log(err);
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Currency App</h1>
        </header>
        <main>
          <h2>Currency Rates</h2>
          <table id="currency">
            <tbody>
              {this.state.error ? (
                <div>
                  <p>Limit zapytań do API wyczerpany</p>
                </div>
              ) : (
                this.state.currData.map((item, index) => (
                  <tr key={index}>
                    <CurrRow data={item} heading={this.HEADING[index]} />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}

export default App;
