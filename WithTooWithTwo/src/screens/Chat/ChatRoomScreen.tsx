import {
  Image,
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {ChatStackParamList} from '../Authenticated/ChatScreen';
import React, {useEffect, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';

import {ChatPostType, fetchChatMessage} from '../../util/chat';
import {Colors} from '../../constants/styles';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {fetchGroup} from '../../util/group';

type ChatRoomScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatRoom'
>;
type ChatRoomScreenRouteProp = RouteProp<ChatStackParamList, 'ChatRoom'>;

type ChatRoomScreenProps = {
  navigation: ChatRoomScreenNavigationProp;
  route: ChatRoomScreenRouteProp;
};

export type MessageType = {
  roomId: string;
  sender: string;
  message: string;
  sentAt?: string;
};

const SOCKET_URL = 'ws://3.39.87.78:8080/ws/chat';

const ChatRoomScreen = ({navigation, route}: ChatRoomScreenProps) => {
  const roomId = route.params.roomId;
  const userId = route.params.userId;
  const opponent = route.params.opponent;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [post, setPost] = useState<ChatPostType>();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = new WebSocket(SOCKET_URL);

    newSocket.onopen = () => {
      let message: MessageType = {
        roomId: roomId,
        sender: userId,
        message: 'ENTER-CHAT',
      };
      newSocket.send(JSON.stringify(message));
      console.log('WebSocket connected');
    };

    newSocket.onmessage = event => {
      // Handle incoming messages from the WebSocket server
      const message = JSON.parse(event.data);
      console.log(message, 'message');
      const chatMessage: IMessage = {
        _id: `${message.sendAt}-${Math.random()}`,
        text: message.message,
        createdAt: new Date(message.sendAt),
        user: {
          _id: message.sender,
          name: `sender${message.sender}`,
        },
      };
      console.log(chatMessage, 'chatMessage');
      setMessages(prevMessages => [chatMessage, ...prevMessages]);
    };

    newSocket.onclose = event => {
      console.log('WebSocket closed:', event.reason);
    };

    setSocket(newSocket);

    // Clean up WebSocket on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    fetchChatMessage(roomId).then(res => {
      setMessages(res.messages);
      setPost(res.post);
    });
  }, [userId]);

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  const onSend = (newMessages: IMessage[] = []) => {
    if (socket && newMessages.length > 0) {
      const message: MessageType = {
        roomId: roomId,
        sender: userId,
        message: newMessages[0].text,
      };
      socket.send(JSON.stringify(message));
      // setMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, newMessages),
      // );
    }
  };

  const renderMessageBubble = (props: any) => {
    const {currentMessage, user} = props;
    //console.log(currentMessage);
    const position =
      currentMessage.user._id.toString() === userId ? 'right' : 'left';
    const messageStyle: StyleProp<ViewStyle> = {
      backgroundColor: position === 'right' ? Colors.chat : Colors.primary500, // Adjust the colors as needed
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginLeft: position === 'left' ? 10 : 50, // Add spacing for right-side messages
      marginRight: position === 'right' ? 10 : 50, // Add spacing for left-side messages
      alignSelf: position === 'right' ? 'flex-end' : 'flex-start', // Align to right or left
      margin: 3,
    };

    const textStyle: StyleProp<TextStyle> = {
      color: position === 'left' ? 'white' : Colors.grey10,
    };

    return (
      <View>
        <View style={messageStyle}>
          <Text style={textStyle}>{currentMessage.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScreenHeader color={'white'} isGoBack={true} title={opponent.nickname} />
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{_id: userId, name: 'You'}}
        scrollToBottom={true}
        alwaysShowSend={true}
        renderMessage={renderMessageBubble}
      />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
