import React from 'react';
import { useSelector } from 'react-redux';
import { selectItemsCount } from '../../store/selectors';

export default function ItemsCounter() {
  const count = useSelector(selectItemsCount);

  return <div data-testid="counter">Ваши дела: {count}</div>;
}
