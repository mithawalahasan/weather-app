class Forecast {
  constructor() {
    this.key = "HWaEzFXce52oWjdyFfSN63UXi4v4ymB4";
    this.weatheruri =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityuri =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const citydets = await this.getCity(city);
    const weather = await this.getWeather(citydets.Key);
    return {
      citydets,
      weather, // object shorthand notaion if value and property are same
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityuri + query);
    const data = await response.json();
    return data[0];
  }
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatheruri + query);
    const data = await response.json();
    return data[0];
  }
}
