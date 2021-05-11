import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import './App.css';
import TodoView from '../views/TodoView';
import LoginView from '../views/LoginView';
import Alert from '../components/Alert/Alert';
import { initialAuthCheck } from '../store/reducers/todoSlice';
import ReverseString from '../components/ReverseString/ReverseString';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialAuthCheck());
  }, []);

  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <Alert />
      </div>
      <Switch>
        <Route path="/login" component={LoginView} />
        <Route path="/todo" component={TodoView} />
      </Switch>
        <div>
            <ReverseString />
        </div>
    </div>
  );
}
