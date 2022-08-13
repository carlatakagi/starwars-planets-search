import React, { useState, createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import planetsApi from '../services/planetsApi';

export const PlanetContext = createContext();

function Provider({ children }) {
  const [planetsData, setPlanetsData] = useState([]); // cria o estado
  const [filterPlanetsData, setFilterPlanetsData] = useState([]); // cria o estado
  const [filterName, setFilterName] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filterNumeric, setFilterNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const getPlanetsFromApi = () => {
    planetsApi()
      .then((response) => {
        setPlanetsData(response.results);
        setFilterPlanetsData(response.results);
      });
  };

  // montar componente
  // primeiro parametro o que sera executado
  // segundo: lista que sao dependencias para que o useEffect seja chamado
  // [] array vazio usa quando a info so é chamada uma vez
  useEffect(() => { getPlanetsFromApi(); }, []);

  const contextValue = {
    planetsData,
    setPlanetsData,
    filterName,
    setFilterName,
    filterPlanetsData,
    setFilterPlanetsData,
    filterNumeric,
    setFilterNumeric,
    filterByNumericValues,
    setFilterByNumericValues,
    columnOptions,
    setColumnOptions,
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}

// hook acessa o contexto de forma mais simples
export const usePlanetContext = () => {
  const context = useContext(PlanetContext);

  if (context === 'undefined') {
    throw new Error('usePlanetContext não existe');
  }

  return context;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
