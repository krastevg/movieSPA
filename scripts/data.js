function host(endpoint) {
  return `https://api.backendless.com/62310895-148D-E3F3-FF12-8D8EE5D4EF00/DBFD9ABA-1B74-47C6-BDFE-5B5268032640/${endpoint}`;
}

const endpoints = {
  REGISTER: 'users/register',
  LOGIN: 'users/login',
  LOGOUT: 'users/logout',
  GETMOVIES: 'data/movies',
};

function getToken() {
  const token = localStorage.getItem('userToken');
  if (token === null) {
    throw Error('You must log in first');
  } else {
    return token;
  }
}
export async function register(username, password) {
  return (
    await fetch(host(endpoints.REGISTER), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
  ).json();
}

export async function login(username, password) {
  const result = await (
    await fetch(host(endpoints.LOGIN), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: username,
        password,
      }),
    })
  ).json();
  // need to fucking get these in the controler
  console.log(result);
  localStorage.setItem('userToken', result['user-token']);
  localStorage.setItem('username', result['username']);
  localStorage.setItem('userId', result['objectId']);

  return result;
}

export async function logout() {
  const token = getToken();
  localStorage.removeItem('userToken');
  return fetch(host(endpoints.LOGOUT), {
    headers: {
      'user-token': token,
    },
  });
}

export async function getMovies() {
  const token = getToken();
  return (
    await fetch(host(endpoints.GETMOVIES), {
      headers: {
        'user-token': token,
      },
    })
  ).json();
}

export async function getMovieById(id) {
  const token = getToken();
  return (
    await fetch(host(endpoints.GETMOVIES + `/${id}`), {
      headers: {
        'user-token': token,
      },
    })
  ).json();
}

export async function createMovie(obj) {
  const token = getToken();
  return (
    await fetch(host(endpoints.GETMOVIES), {
      method: 'POST',
      headers: {
        'user-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
  ).json();
}

export async function updateMovie(id, updatedMovie) {
  const token = getToken();
  return (
    await fetch(host(endpoints.GETMOVIES + `/${id}`), {
      method: 'PUT',
      headers: {
        'user-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    })
  ).json();
}

export async function deleteMovie(id) {
  const token = getToken();
  return (
    await fetch(host(endpoints.GETMOVIES + `/${id}`), {
      method: 'DELETE',
      headers: {
        'user-token': token,
      },
    })
  ).json();
}

export async function getMoviesByOwner(ownerId) {
  const token = getToken();
  return (
    await fetch(
      host(endpoints.GETMOVIES + `?where=ownerId%3D%27${ownerId}%27`),
      {
        headers: {
          'user-token': token,
        },
      }
    )
  ).json();
}

export async function buyTicket(movie) {
  const tickets = movie.tickets > 0 ? movie.tickets - 1 : 0;
  return updateMovie(movie.objectId, { tickets });
}
