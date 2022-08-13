import React from 'react';
import './App.css';
import MyProvider from './context/myProvider';
import Table from './components/Table';
import Header from './components/Header';
import Search from './components/Search';
import NumericFilter from './components/NumericFilter';

function App() {
  return (
    <MyProvider>
      <Header />
      <Search />
      <NumericFilter />
      <Table />
    </MyProvider>
  );
}

export default App;
