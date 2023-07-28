import axios from 'axios';

const API_KEY = 'AIzaSyAuLUuSd-dJkZMKz0R9rT8_MmrgDvkdsAU';
const url = 'http://10.50.45.55:8080/login?email=&password=';
const joinURL = 'http://10.50.45.55:8080/users';
async function authenticate(mode: string, email: string, password: string) {
  //const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    // returnSecureToken: true,
  });
  // console.log(response.data);
  // const token = response.data.idToken;
  const token = response.data.id;
  // console.log(token);
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
  const formData = new FormData();
  formData.append('name', value.name);
  formData.append('phoneNumber', value.phoneNumber);
  formData.append('statusMessage', value.statusMessage);
  formData.append('nickname', value.nickname);
  formData.append('email', value.email);
  formData.append('password', value.password);
  formData.append('gender', value.gender);
  formData.append('bYear', value.bYear);
  formData.append('bMonth', value.bMonth);
  formData.append('bDay', value.bDay);

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  // const response = await axios.post(joinURL, {
  //   name: value.name,
  //   phoneNumber: value.phoneNumber,
  //   email: value.email,
  //   password: value.password,
  //   nickname: value.nickname,
  //   statusMessage: value.statusMessage,
  //   gender: value.gender,
  //   bYear: value.bYear,
  //   bMonth: value.bMonth,
  //   bDay: value.bDay,
  //   profileImage: 'test',
  //   // returnSecureToken: true,
  // });

  const response = await axios.post(joinURL, formData);
  // console.log(response.data);
  // const token = response.data.idToken;
  return response.data.id;
  // return token;
}

export function login(email: string, password: string) {
  return authenticate('signInWithPassword', email, password);
}
