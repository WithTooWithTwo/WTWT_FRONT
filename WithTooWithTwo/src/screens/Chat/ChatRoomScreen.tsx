import {SafeAreaView, StyleProp, Text, View, ViewStyle} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import {RouteProp} from '@react-navigation/native';
import {ChatStackParamList} from '../Authenticated/ChatScreen';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import io, {Socket} from 'socket.io-client';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import useSocket from '../../util/useSocket';
import {fetchChatMessage} from '../../util/chat';

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
  const [messages, setMessages] = useState<IMessage[]>([]);
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
          name: 'You',
        },
      };
      console.log(chatMessage, 'chatMessage');

      // Add the chat message to the messages state
      //setMessages(prevMessages => [...prevMessages, chatMessage]);

      //setMessages(prevMessages => [...prevMessages, message]);
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
    fetchChatMessage(roomId).then(res => setMessages(res));
  }, [userId]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const onSend = (newMessages: IMessage[] = []) => {
    if (socket && newMessages.length > 0) {
      const message: MessageType = {
        roomId: roomId,
        sender: userId,
        message: newMessages[0].text,
      };
      socket.send(JSON.stringify(message));
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{_id: userId, name: 'You'}}
        scrollToBottom={true}
        alwaysShowSend={true}
        // renderMessage={props => {
        //   const {currentMessage} = props;
        //   const isMyMessage = currentMessage!.user._id === userId;
        //
        //   return (
        //     <MessageBubble
        //       {...props}
        //       currentMessage={currentMessage}
        //       position={isMyMessage ? 'right' : 'left'} // Adjust position based on the user
        //     />
        //   );
        // }}
      />
    </SafeAreaView>
  );
};

const MessageBubble = ({
  currentMessage,
  position,
}: {
  currentMessage: any;
  position: any;
}) => {
  const messageStyle: StyleProp<ViewStyle> = {
    backgroundColor: position === 'right' ? '#007AFF' : '#ECECEC', // Adjust the colors as needed
    borderRadius: 20,
    padding: 10,
    marginLeft: position === 'left' ? 0 : 50, // Add spacing for right-side messages
    marginRight: position === 'right' ? 0 : 50, // Add spacing for left-side messages
    alignSelf: position === 'right' ? 'flex-end' : 'flex-start', // Align to right or left
  };

  return (
    <View style={messageStyle}>
      <Text>{currentMessage.text}</Text>
    </View>
  );
};

export default ChatRoomScreen;

// const ChatRoomScreen = ({navigation, route}: ChatRoomScreenProps) => {
//   const roomId = route.params.roomId;
//   const userId = route.params.userId;
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const webSocket = useRef<WebSocket | null>();
//   const [socket, disconnect] = useSocket();
//
//   useEffect(() => {
//     let message: MessageType = {
//       roomId: roomId,
//       sender: userId,
//       message: 'ENTER-CHAT',
//     };
//     // if (socket) {
//     //   socket.emit('message', message);
//     // }
//
//     webSocket.current = new WebSocket('ws://3.39.87.78:8080/ws/chat');
//     console.log(webSocket);
//
//     webSocket.current.onopen = () => {
//       let message: MessageType = {
//         roomId: roomId,
//         sender: userId,
//         message: 'ENTER-CHAT',
//       };
//
//       webSocket.current?.send(JSON.stringify(message));
//       console.log('connected');
//       // send a message
//     };
//     webSocket.current.onmessage = e => {
//       setMessages(previousMessages =>
//         GiftedChat.append(previousMessages, e.data),
//       );
//       console.log(e.data, 1);
//     };
//
//     webSocket.current.onerror = e => {
//       // an error occurred
//       console.log(e.message);
//     };
//
//     webSocket.current.onclose = e => {
//       // connection closed
//       console.log(e.code, e.reason);
//     };
//
//     return () => {
//       webSocket.current!.close();
//     };
//
//     // const socket = io('ws://3.39.87.78:8080/ws/chat');
//     // console.log(socket);
//     // webSocket.current.on('message', () => {
//     //   let message: MessageType = {
//     //     roomId: roomId,
//     //     sender: userId,
//     //     message: 'ENTER-CHAT',
//     //   };
//     //   webSocket.current!.emit('message', message);
//     //   console.log('Connected Server');
//     // });
//     //
//     // webSocket.current.on('message', message => {
//     //   setMessages(previousMessages =>
//     //     GiftedChat.append(previousMessages, {
//     //       ...message,
//     //       createdAt: new Date(message.createdAt),
//     //     }),
//     //   );
//     // });
//
//     return () => {
//       webSocket.current!.close();
//     };
//   }, []);
//
//   const onSend = useCallback((newMessages: IMessage[]) => {
//     webSocket.current!.send(
//       JSON.stringify({
//         roomId: roomId,
//         sender: userId,
//         messages: newMessages[0].text,
//       }),
//     );
//   }, []);
//
//   return (
//     <GiftedChat messages={messages} onSend={onSend} user={{_id: userId}} />
//   );
// };

// export default ChatRoomScreen;