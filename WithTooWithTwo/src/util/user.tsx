import {ImageType} from '../slices/postsSlice';
import {OptionType} from './review';
import axios from 'axios';
import {GroupMember, GroupType} from './group';

export interface UserType {
  id: number;
  profileImage: ImageType;
  nickname: string;
  rate: number | null;
  statusMessage: string | null;
  countsOfGroups: number;
  countsOfPosts: number;
  countsOfReviews: number;
  myGroups: GroupType[];
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

export const defaultUser: UserType = {
  id: 0,
  profileImage: {
    uri: '',
    name: '',
    type: '',
  },
  nickname: '',
  rate: null,
  statusMessage: null,
  countsOfGroups: 0,
  countsOfPosts: 0,
  countsOfReviews: 0,
  myGroups: [],
  styles: null,
  personalities: null,
  reviews: null,
};

export const fetchUser = async () => {
  const response = await axios.get(process.env.API_KEY + '/users');
  const user: UserType = await response.data;
  return user;
};

export const fetchAnotherUser = async (id: string) => {
  const response = await axios.get(process.env.API_KEY + '/users/' + id);
  const user: UserType = await response.data;
  return user;
};

export type SearchUserType = {
  isExist: boolean;
  user?: GroupMember;
};

export const checkIsUser = async (nickname: string) => {
  const response = await axios.get(
    process.env.API_KEY + '/users/check?nickname=' + nickname,
  );
  const data: SearchUserType = response.data;
  return data;
};
