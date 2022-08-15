import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //const [users,setUsers] = useState([])
  //const [loading, setLoading] = useState(true)

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    // setUsers(data);
    // setLoading(false);
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  //get single user
  const getUser = async (user) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${user.login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      // setUsers(data);
      // setLoading(false);
      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  const getRepos = async (userData) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });

    console.log(userData.login);

    const response = await fetch(
      `${GITHUB_URL}/users/${userData.login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      },
    );

    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };

  //Set Loading State
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  const clearSearch = () => {
    dispatch({
      type: 'GET_USERS',
      payload: [],
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearSearch,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
