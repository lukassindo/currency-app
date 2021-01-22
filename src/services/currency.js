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
    console.log(res);
    let shortDate;
    let data = res.map((item) => {
      if (item.Note) throw "API Limit reached";
      let date = item["Meta Data"]["5. Last Refreshed"];
      shortDate = date.slice(0, 10);
      let oneDay = item["Time Series FX (Daily)"][shortDate]["1. open"];
      item = oneDay;

      return item;
    });
    console.log(data);
    dataToGo = data;
    shortDate !== undefined
      ? dataToGo.unshift(shortDate)
      : dataToGo.unshift("API Limit reached");
    return dataToGo;
  });
};

export default {
  getCurrences,
};
