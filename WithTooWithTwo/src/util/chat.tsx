import {GroupMember} from './group';
import axios from 'axios';

const URL = 'http://3.39.87.78:8080';

export type ChatListType = {
  roomId: number;
  title: string;
  user: GroupMember;
  lastMessage: string;
  unreadCount: number;
};

export const requestChatRoom = async (postId: string) => {
  const response = await axios.post(URL + '/chat?postId=' + postId);
  const chatRoom = response.data;
  return chatRoom;
};

export const fetchChatList = async () => {
  const response = await axios.get(URL + '/chat');
  const chatList: ChatListType[] = response.data;
  return chatList;
};
