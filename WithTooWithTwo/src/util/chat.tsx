import {GroupMember} from './group';
import axios from 'axios';
import {IMessage} from 'react-native-gifted-chat';

export type ChatListType = {
  roomId: number;
  title: string;
  user: GroupMember;
  lastMessage: string;
  unreadCount: number;
};

export const requestChatRoom = async (postId: string) => {
  const response = await axios.post(
    process.env.API_KEY + '/chat?postId=' + postId,
  );
  const chatRoom = response.data;
  return chatRoom;
};

export const fetchChatList = async () => {
  const response = await axios.get(process.env.API_KEY + '/chat');
  const chatList: ChatListType[] = response.data;
  return chatList;
};

export const fetchChatMessage = async (api: string = '') => {
  const response = await axios.get(process.env.API_KEY + '/chat/' + api);
  const messages: IMessage[] = [];
  const data = response.data.messages;
  for (const key in data) {
    const messageObj = {
      _id: data[key].sendAt + Math.random().toString(),
      text: data[key].message,
      createdAt: new Date(data[key].sendAt),
      user: {
        _id: data[key].sender,
        name: data[key].sender + data[key].sendAt,
      },
    };
    messages.push(messageObj);
  }

  return {
    messages: messages.reverse(),
    post: response.data.post,
    userProfile: response.data.userProfile,
  };
};

export type ChatPostType = {
  id: string;
  title: string;
  firstDay: string;
  lastDay: string;
  image: string | null;
};

export const defaultChatPost = {
  id: '0',
  title: '',
  firstDay: '',
  lastDay: '',
  image: null,
};
