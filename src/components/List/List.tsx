import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../ListItem/ListItem';
import { IItem } from '../../store/reducers/todoSlice';
import { selectFilteredList } from '../../store/selectors';

type DecoupledListProps = {
  list: IItem[];
};

export function DecoupledList({ list }: DecoupledListProps) {
  if (list.length === 0) {
    return <div>Список пуст</div>;
  }

  return (
    <>
      <ul>
        {list.map(item => (
          <ListItem id={item.id} key={item.id} title={item.title} isChecked={item.isChecked} />
        ))}
      </ul>
    </>
  );
}

export default function List() {
  const list = useSelector(selectFilteredList);
  return (
    <>
      <DecoupledList list={list} />
    </>
  );
}
