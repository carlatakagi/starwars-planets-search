const PLANETS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetsApi = async () => {
  const request = await fetch(PLANETS_API);
  const json = await request.json();

  return json;
};

export default getPlanetsApi;
