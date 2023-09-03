import {SafeAreaView, View} from 'react-native';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {useEffect, useState} from 'react';
import {ChatListType, fetchChatList} from '../../util/chat';
import ChatListItem from '../../components/Chat/ChatListItem';
import {fetchUser, UserType} from '../../util/user';
import {Colors} from '../../constants/styles';

const ChatListScreen = () => {
  const [chatList, setChatList] = useState<ChatListType[]>([]);

  useEffect(() => {
    console.log(chatList);
  }, [chatList]);

  useEffect(() => {
    fetchChatList().then(res => setChatList(res));
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScreenHeader color={'white'} isGoBack={false} title="채팅" />
      <View style={{backgroundColor: Colors.grey1, padding: 24}}>
        {chatList &&
          chatList.map(item => (
            <ChatListItem key={item.title + item.lastMessage} chat={item} />
          ))}
      </View>
      <View style={{backgroundColor: Colors.grey1, flex: 1}} />
    </SafeAreaView>
  );
};

export default ChatListScreen;
