import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login(username, password));
  }

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="loginForm">
        <div>
          <label>
            Username:&nbsp;
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:&nbsp;
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit" className="loginBtn">
          Log In
        </button>
      </form>
    </>
  );
}
