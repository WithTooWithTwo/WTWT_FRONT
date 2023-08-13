import axios from 'axios';
import {Platform} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';

const API_KEY = 'http://3.39.87.78:8080';

async function authenticate(email: string, password: string) {
  const response = await axios.post(API_KEY + '/login', {
    email: email,
    password: password,
  });
  // 현재 토큰 없이 아이디만 제공되는데 일단 아이디를 토큰으로 저장함
  const token = response.data.id;
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
  profileImage?: ImagePickerResponse;
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

  let uri;
  if (
    value.profileImage &&
    value.profileImage.assets &&
    value.profileImage.assets.length > 0
  ) {
    formData.append('profileImage', {
      uri:
        Platform.OS === 'android'
          ? value.profileImage.assets[0].uri
          : value.profileImage.assets[0].uri!.replace('file://', ''),
      name: value.profileImage.assets[0].fileName,
      type: value.profileImage.assets[0].type,
    });
  }

  // const response = await axios.post(
  //   API_KEY + '/login?email=&password=',
  //   formData,
  // );
  const response = await axios.post(API_KEY + '/users', formData);
  // 현재 토큰 없이 아이디만 제공됨
  return response.data.id;
}

export function login(email: string, password: string) {
  return authenticate(email, password);
}
