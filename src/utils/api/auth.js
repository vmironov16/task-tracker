import axios from 'axios';

import { urlApi } from './vars';

const configHeader = accessToken => ({ headers: { Authorization: `Bearer ${accessToken}` } });

export const setUserObjLocalStorage = obj => localStorage.setItem('user', JSON.stringify(obj));
export const getUserObjLocalStorage = () => ((localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null);
export const deleteUserObjLocalStorage = () => localStorage.removeItem('user');


export const login = async (email, password) => {
  let accessToken = '';
  try {
    accessToken = await axios.post(
      `${urlApi}/login`,
      { email, password },
    ).then(
      response => response.data.accessToken,
    );
  } catch (error) {
    throw error;
  }
  return accessToken;
};

export const registerUser = async (email, password) => {
  let accessToken = '';
  try {
    accessToken = await axios.post(
      `${urlApi}/register`,
      { email, password },
    ).then(
      response => response.data.accessToken,
    );
    localStorage.setItem('accessToken', accessToken);
  } catch (error) {
    throw error;
  }
  return accessToken;
};

export const getUserIdByEmail = async (email, accessToken) => {
  let userId = null;
  try {
    const users = await axios.get(
      `${urlApi}/users`,
      configHeader(accessToken),
    ).then(
      response => response.data,
    );
    const user = users.find(userBD => (userBD.email === email));
    userId = user.id;
  } catch (error) {
    throw error;
  }

  return userId;
};


export const getAccessToken = () => {
  const userObj = getUserObjLocalStorage();
  return (userObj) ? userObj.accessToken : null;
};

