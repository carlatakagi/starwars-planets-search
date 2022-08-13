import React from 'react';
import { usePlanetContext, PlanetContext } from '../context/myProvider';

function NumericFilter() {
  const {
    planetsData,
    filterPlanetsData,
    setFilterNumeric,
    filterNumeric,
    filterByNumericValues,
    setFilterByNumericValues,
    setFilterPlanetsData,
    columnOptions,
    setColumnOptions,
  } = usePlanetContext(PlanetContext);

  const handleChangeColumn = ({ target }) => {
    const { value } = target;

    setFilterNumeric({
      ...filterNumeric,
      column: value,
    });
  };

  const handleChangeComparison = ({ target }) => {
    const { value } = target;

    setFilterNumeric({
      ...filterNumeric,
      comparison: value,
    });
  };

  const handleChangeValue = ({ target }) => {
    const { value } = target;

    setFilterNumeric({
      ...filterNumeric,
      value,
    });
  };

  // func que filtra os planetas por column, comparacao e value
  const clickAndFilterByNumeric = (column, comparison, value) => {
    // console.log(column, comparison, value);
    if (comparison === 'maior que') {
      return filterPlanetsData.filter((planet) => planet[column] > Number(value));
    }
    if (comparison === 'menor que') {
      return filterPlanetsData.filter((planet) => planet[column] < Number(value));
    }
    if (comparison === 'igual a') {
      return filterPlanetsData.filter((planet) => planet[column] === value);
    }
    return planetsData;
  };

  // para poder filtrar as opções
  const initialColumnOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const removeColumnFilter = (column) => {
    const removeSelectedColumn = columnOptions.filter((option) => option !== column);
    console.log(removeSelectedColumn);
    return removeSelectedColumn;
  };

  const handleClick = () => {
    const { column, comparison, value } = filterNumeric;
    // console.log('handleClick clicou');
    setFilterByNumericValues([
      ...filterByNumericValues,
      filterNumeric,
    ]);

    setFilterPlanetsData(clickAndFilterByNumeric(column, comparison, value));
    setColumnOptions(removeColumnFilter(column));

    setFilterNumeric({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  // console.log('console do filter by numeric values', filterByNumericValues); // era pra ser um array pra eu fazer um map
  // console.log('console do filter numeric', filterNumeric);

  const removeOneFilter = () => {
    console.log('remove um');
  };

  const removeAll = () => {
    // console.log('remove tudo');
    setFilterByNumericValues([]);
    setColumnOptions(initialColumnOptions);
    setFilterPlanetsData(planetsData);
  };

  return (
    <div>
      <form>
        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            onChange={ (event) => handleChangeColumn(event) }
          >
            {columnOptions.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
            {/* <option value="population">population</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option> */}
          </select>
        </label>

        <label htmlFor="comparison-filter">
          <select
            data-testid="comparison-filter"
            onChange={ (event) => handleChangeComparison(event) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <input
          data-testid="value-filter"
          type="number"
          placeholder="Digite um número"
          value={ filterNumeric.value }
          onChange={ (event) => handleChangeValue(event) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Pesquisar

        </button>

        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ removeAll }
        >
          Remover todas filtragens

        </button>
      </form>

      <div>
        {filterByNumericValues.map((filter, index) => (
          <span key={ index }>
            {`${filter.column} é ${filter.comparison} que ${filter.value}`}
            <button
              data-testid="filter"
              type="button"
              onClick={ removeOneFilter }
            >
              X

            </button>
          </span>
        ))}

      </div>

    </div>
  );
}

export default NumericFilter;
