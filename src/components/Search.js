import React from 'react';
import './Search.css';
import { usePlanetContext, PlanetContext } from '../context/myProvider';

function Search() {
  const {
    planetsData,
    setFilterName,
    setFilterPlanetsData,
  } = usePlanetContext(PlanetContext);

  const nameFiltered = (name) => {
    if (name !== undefined) {
      const planetFilteredName = planetsData.filter(
        (planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
      );
      console.log(planetFilteredName);
      setFilterPlanetsData(planetFilteredName);
    } else {
      setFilterPlanetsData(planetsData);
    }
  };

  const handleInputName = ({ target }) => {
    console.log(target.value);
    const { value } = target;

    setFilterName({ filterByName: { name: value } });
    nameFiltered(value);
  };

  return (
    <div className="table-filter">
      <h3>Digite o nome do planeta</h3>
      <input
        type="text"
        data-testid="name-filter"
        className="filter"
        onChange={ (event) => handleInputName(event) }
      />

    </div>
  );
}

export default Search;
