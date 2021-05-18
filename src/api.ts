const URL = 'http://localhost:3001';
//const URL = 'http://192.168.200.105:3001';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

function randomNumber() {
  return Math.random();
}

async function handleError(response: any) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

const api = {
  todo: {
    add: ({ title }: { title: string }) =>
      fetch(`${URL}/todos`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          title
        })
      }).then(handleError),
    list: () => fetch(`${URL}/todos?${randomNumber()}`).then(handleError),
    remove: ({ id }: { id: string }) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'DELETE'
      }).then(handleError),
    checked: ({ id, isChecked }: { id: string; isChecked: boolean }) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          id,
          isChecked
        })
      }).then(handleError),
    edit: ({ id, title }: { id: string; title: string }) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          id,
          title
        })
      }).then(handleError)
  },
  auth: {
    check: () => fetch(`${URL}/auth`).then(handleError),
    login: (username: string, password: string) =>
      fetch(`${URL}/auth`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          username,
          password
        })
      }).then(handleError),
    logout: () =>
      fetch(`${URL}/auth`, {
        method: 'DELETE'
      }).then(handleError)
  }
};

export default api;
