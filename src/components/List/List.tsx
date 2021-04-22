import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../ListItem/ListItem';
import { IItem } from '../../store/reducers/todoSlice';
import { getItems } from '../../store/actions';
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
  const dispatch = useDispatch();
  const list = useSelector(selectFilteredList);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <>
      <DecoupledList list={list} />
    </>
  );
}
