import React from 'react';
import './App.css';
import Alert from '../components/Alert/Alert';
import Filter from '../components/Filter/Filter';
import Form from '../components/Form/Form';
import ItemsCounter from '../components/ItemsCounter/ItemsCounter';
import List from '../components/List/List';

export default function App() {
  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Фильтруемый список в React</h2>
      </div>
      <Alert />
      <Form />
      <div>
        <Filter />
      </div>
      <div>
        <ItemsCounter />
      </div>
      <List />
    </div>
  );
}
