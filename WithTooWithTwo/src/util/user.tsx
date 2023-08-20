import {ImageType} from '../slices/postsSlice';
import {OptionType} from './review';
import axios from 'axios';

const API_KEY = 'http://3.39.87.78:8080';

export interface UserType {
  id: number;
  profileImage: ImageType;
  nickname: string;
  rate: number | null;
  statusMessage: string | null;
  countsOfGroups: number;
  countsOfPosts: number;
  countsOfReviews: number;
  myGroups: any[] | null;
  styles: OptionType[] | null;
  personalities: OptionType[] | null;
  comments: string[];
}

export const fetchUser = async () => {
  const response = await axios.get(API_KEY + '/users');
  const user: UserType = await response.data;
  return user;
};