import React from 'react';
import Alert from '../components/Alert/Alert';
import Form from '../components/Form/Form';
import Filter from '../components/Filter/Filter';
import ItemsCounter from '../components/ItemsCounter/ItemsCounter';
import List from '../components/List/List';

export default function TodoView() {
  return (
    <>
      <Alert />
      <Form />
      <Filter />
      <ItemsCounter />
      <List />
    </>
  );
}
