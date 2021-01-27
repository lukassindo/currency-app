const getCurrences = () => {
  let dataToGo = [];
  const currences = ["USD", "EUR", "GBP", "CZK", "CAD"];
  const urls = [];
  currences.forEach((currencySymbol) => {
    let url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=PLN&to_symbol=${currencySymbol}&apikey=Z8UD320S1274I7YY`;
    urls.push(url);
  });

  return Promise.all(
    urls.map((url) => {
      return fetch(url).then((response) => response.json());
    })
  ).then((res) => {
    let shortDate;
    let data = res.map((item) => {
      if (item.Note) throw "API Limit reached";
      let date = item["Meta Data"]["5. Last Refreshed"];
      shortDate = date.slice(0, 10);
      let oneDay = item["Time Series FX (Daily)"][shortDate]["1. open"];
      item = oneDay;

      return item;
    });
    dataToGo = data;
    shortDate !== undefined
      ? dataToGo.unshift(shortDate)
      : dataToGo.unshift("API Limit reached");
    return dataToGo;
  });
};

const getWeekly = (currency) => {
  let weeklyData = [];
  const url = `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=PLN&to_symbol=${currency}&apikey=Z8UD320S1274I7YY`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);    
        if (data.Note) throw "API Limit reached";
        const date = data["Meta Data"]["4. Last Refreshed"];
        const shortDate = date.slice(0, 10);
        let openData = data["Time Series FX (Weekly)"][shortDate]["1. open"];
        let closeData = data["Time Series FX (Weekly)"][shortDate]["4. close"];
        weeklyData.push(`PLN/${currency}`, `Last Friday - ${shortDate}`, openData, closeData);
        return weeklyData;
     
    });
}



export default {
  getCurrences,
  getWeekly,
};
