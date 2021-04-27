import React from 'react';
import Form from '../components/Form/Form';
import Filter from '../components/Filter/Filter';
import ItemsCounter from '../components/ItemsCounter/ItemsCounter';
import List from '../components/List/List';
import Logout from '../components/Logout/Logout';

export default function TodoView() {
  return (
    <>
      <Logout />
      <Form />
      <Filter />
      <ItemsCounter />
      <List />
    </>
  );
}
