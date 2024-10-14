async function fetchData(amount: string): Promise<any> {
  try {
    const url: string = `https://simpleswap.io/api/v4/estimates?tickerFrom=eth&networkFrom=eth&tickerTo=btc&networkTo=btc&amount=${amount}&reverse=false&fixed=false`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

async function ethToBtcRates(amount: string) {
  try {
    const data = await fetchData(amount);
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export {ethToBtcRates}
