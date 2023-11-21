import {
  Image,
  Pressable,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {ChatStackParamList} from '../Authenticated/ChatScreen';
import React, {useEffect, useState} from 'react';
import {
  Composer,
  Day,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';

import {ChatPostType, defaultChatPost, fetchChatMessage} from '../../util/chat';
import {Colors} from '../../constants/styles';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {
  AlarmType,
  defaultAlarm,
  defaultGroupMember,
  GroupMember,
  patchAlarms,
} from '../../util/group';
import ChatPostData from '../../components/Chat/ChatPostData';
import {getKoreanTime} from '../../util/date';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UserInfoModal from '../../components/Member/UserInfoModal';
import EventSource from 'react-native-event-source';

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
  const [post, setPost] = useState<ChatPostType>(defaultChatPost);
  const [opponentProfile, setOpponentProfile] =
    useState<GroupMember>(defaultGroupMember);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const groupId = 2;

  const navigations = useNavigation<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalUserId, setModalUserId] = useState<string>('0');

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
      setOpponentProfile(res.userProfile);
    });
  }, [userId]);

  const pressMemberHandler = (id: number) => {
    setModalUserId(id.toString());
    setIsVisible(true);
  };

  const onSend = (newMessages: IMessage[] = []) => {
    if (socket && newMessages.length > 0) {
      const message: MessageType = {
        roomId: roomId,
        sender: userId,
        message: newMessages[0].text,
      };
      socket.send(JSON.stringify(message));
    }
  };

  const renderMessageBubble = (props: any) => {
    const {currentMessage} = props;
    // console.log(currentMessage);
    const position =
      currentMessage.user._id.toString() === userId ? 'right' : 'left';
    const messageStyle: StyleProp<ViewStyle> = {
      backgroundColor: position === 'right' ? Colors.chat : Colors.primary500, // Adjust the colors as needed
      borderRadius: 8,
      borderTopLeftRadius: position === 'right' ? 8 : 2,
      borderTopRightRadius: position === 'right' ? 2 : 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf: 'flex-start',
    };

    const containerStyle: StyleProp<ViewStyle> = {
      marginLeft: position === 'left' ? 10 : 50, // Add spacing for right-side messages
      marginRight: position === 'right' ? 10 : 50, // Add spacing for left-side messages
      alignSelf: position === 'right' ? 'flex-end' : 'flex-start', // Align to right or left
      margin: 4,
      flexDirection: 'row',
      gap: 5,
    };

    const textStyle: StyleProp<TextStyle> = {
      color: position === 'left' ? 'white' : Colors.grey10,
    };

    if (position === 'right') {
      return (
        <View style={containerStyle}>
          <Text style={styles.time}>
            {getKoreanTime(currentMessage.createdAt)}
          </Text>
          <View style={messageStyle}>
            <Text style={textStyle}>{currentMessage.text}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={containerStyle}>
          <Pressable onPress={() => pressMemberHandler(opponent.id)}>
            {opponentProfile.profile ? (
              <Image
                style={styles.opponentImage}
                source={{uri: opponentProfile.profile}}
              />
            ) : (
              <View style={styles.opponentImage} />
            )}
          </Pressable>
          <View style={styles.opponentMessage}>
            <Text style={styles.opponentName}>{opponentProfile.nickname}</Text>
            <View style={styles.opponentContainer}>
              <View style={messageStyle}>
                <Text style={textStyle}>{currentMessage.text}</Text>
              </View>
              <Text style={styles.time}>
                {getKoreanTime(currentMessage.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };
  const renderDateMarker = (date: any) => {
    console.log(date);
    return <Day {...date} containerStyle={{zIndex: 3}} />;
  };

  const renderInputToolBar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        renderComposer={p => (
          <Composer
            {...p}
            placeholder={''}
            textInputStyle={styles.composerText}
            composerHeight={35}
          />
        )}
        renderSend={p => (
          <Send {...p} containerStyle={styles.sendButton}>
            <FontAwesome5
              name={'arrow-circle-up'}
              color={Colors.primary500}
              size={27}
            />
          </Send>
        )}
        primaryStyle={{
          backgroundColor: Colors.grey1,
          paddingVertical: 10,
          paddingHorizontal: 17,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScreenHeader color={'white'} isGoBack={true} title={opponent.nickname} />
      <ChatPostData post={post} />
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{_id: userId, name: 'You'}}
        scrollToBottom={true}
        alwaysShowSend={true}
        renderMessage={renderMessageBubble}
        renderInputToolbar={renderInputToolBar}
        messagesContainerStyle={{paddingBottom: 30}}
      />
      <UserInfoModal
        userId={modalUserId}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        groupId={6}
        user={opponentProfile}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  time: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: Colors.grey4,
  },
  toolbar: {
    backgroundColor: Colors.grey1,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  composerText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  opponentContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  opponentImage: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: Colors.sub2,
  },
  opponentMessage: {
    flexDirection: 'column',
    marginLeft: 5,
    marginTop: 5,
    gap: 7,
  },
  opponentName: {
    fontSize: 12,
    fontWeight: '300',
  },
});

export default ChatRoomScreen;
