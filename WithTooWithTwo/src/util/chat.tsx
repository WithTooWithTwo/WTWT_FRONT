import {GroupMember} from './group';
import axios from 'axios';
import {MessageType} from '../screens/Chat/ChatRoomScreen';
import {IMessage} from 'react-native-gifted-chat';

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

export const fetchChatMessage = async (api: string = '') => {
  const response = await axios.get(URL + '/chat/' + api);
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

  return messages.reverse();
};
