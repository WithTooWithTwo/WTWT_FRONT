import axios from 'axios';

const API_KEY = 'AIzaSyAuLUuSd-dJkZMKz0R9rT8_MmrgDvkdsAU';

async function authenticate(mode: string, email: string, password: string) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  // console.log(response.data);
  const token = response.data.idToken;
  return token;
}

type valueType = {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  nickname: string;
  statusMessage: string;
  gender: string;
  bYear: number;
  bMonth: number;
  bDay: number;
};

export async function createUser(value: valueType) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  const response = await axios.post(url, {
    name: value.name,
    phoneNumber: value.phoneNumber,
    email: value.email,
    password: value.password,
    nickname: value.nickname,
    statusMessage: value.statusMessage,
    gender: value.gender,
    bYear: value.bYear,
    bMonth: value.bMonth,
    bDay: value.bDay,
    returnSecureToken: true,
  });
  // console.log(response.data);
  const token = response.data.idToken;
  return token;
}

export function login(email: string, password: string) {
  return authenticate('signInWithPassword', email, password);
}
