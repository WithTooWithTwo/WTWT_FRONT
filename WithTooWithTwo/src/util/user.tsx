import {ImageType} from '../slices/postsSlice';
import {OptionType} from './review';
import axios from 'axios';
import {GroupMember} from './group';

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
  styles: MyPageOptionType[] | null;
  personalities: MyPageOptionType[] | null;
  reviews: MyPageReviewType[] | null;
}

export type MyPageOptionType = {
  count: number;
  type: string;
};

export type MyPageReviewType = {
  rate: number;
  comment: string;
  writer: GroupMember;
  writeAt: string;
};

export const fetchUser = async () => {
  const response = await axios.get(API_KEY + '/users');
  const user: UserType = await response.data;
  return user;
};

export const fetchAnotherUser = async (id: string) => {
  const response = await axios.get(API_KEY + '/users/' + id);
  const user: UserType = await response.data;
  return user;
};
