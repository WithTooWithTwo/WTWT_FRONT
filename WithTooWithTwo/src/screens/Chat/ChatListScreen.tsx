import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {useEffect, useState} from 'react';
import {ChatListType, fetchChatList} from '../../util/chat';
import ChatListItem from '../../components/Chat/ChatListItem';
import {Colors} from '../../constants/styles';

const ChatListScreen = () => {
  const [chatList, setChatList] = useState<ChatListType[]>([]);

  useEffect(() => {
    fetchChatList().then(res => setChatList(res));
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScreenHeader color={'white'} isGoBack={false} title="채팅" />
      <View style={{backgroundColor: Colors.grey1, padding: 20}}>
        <FlatList
          data={chatList}
          renderItem={({item}) => <ChatListItem chat={item} />}
          keyExtractor={item => item.title + item.lastMessage}
          windowSize={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{backgroundColor: Colors.grey1, flex: 1}} />
    </SafeAreaView>
  );
};

export default React.memo(ChatListScreen);
