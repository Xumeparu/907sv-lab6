import React from 'react';
import { useSelector } from 'react-redux';
import { selectItemsCount } from '../../store/selectors';

export default function ItemsCounter() {
  const count = useSelector(selectItemsCount);

  return <span>Ваши дела: {count}</span>;
}
