import React from "react";
import logo from "./currency.jpg";
import "./App.css";
import CurrencyService from "./services/currency";
import CurrRow from "./CurrRow";
import WeekRow from "./WeekRow";

class App extends React.Component {
  HEADING = ["DATE", "PLN/USD", "PLN/EUR", "PLN/GBP", "PLN/CZK", "PLN/CAD"];
  CURRENCES = ["", "USD", "EUR", "GBP", "CZK", "CAD"];
  constructor(props) {
    super(props);

    this.state = {
      currData: [],
      getData: false,
      error: false,
      getWeekly: false,
      weekly: [],
      weekError: false,
    };

    this.getData = this.getData.bind(this);
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

  async getData(childData) {
    try {
      const weekly = await CurrencyService.getWeekly(childData);
      console.log(weekly);
      this.setState({weekly, getWeekly: true});
    } catch (err) {
      this.setState({ weekError: true });
    }
    
  }

  render() {
    console.log(this.state.weekly);

    const weekTable = (
      <table className="weekly">
      <caption>Weekly data</caption>
      <tbody>
        <tr>
          <th>Currency</th>
          <th>Week</th>
          <th>Open data</th>
          <th>Close data</th>
        </tr>
        <WeekRow data= {this.state.weekly} />
      </tbody>
      </table>
    );

    const ApiReached = (<div><p style={{border: "2px solid red", padding: "10px 20px"}} >API Limit Reached! Try after five minutes</p></div>)
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
                <tr>
                  <td style={{borderColor: "red"}}>Limit zapytań do API wyczerpany</td>
                </tr>
              ) : (
                this.state.currData.map((item, index) => (
                  <tr key={index}>
                    <CurrRow getData={this.getData} index= {index} data={item} heading={this.HEADING[index]} curr={this.CURRENCES[index]} />
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {this.state.getWeekly ? weekTable
            : this.state.weekError ? ApiReached : null}
        </main>
      </div>
    );
  }
}

export default App;
