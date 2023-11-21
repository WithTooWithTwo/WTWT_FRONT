import {ChatListType} from '../../util/chat';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {fetchUser, UserType} from '../../util/user';

const ChatListItem = ({chat}: {chat: ChatListType}) => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    fetchUser().then(r => {
      setUser(r);
    });
  }, []);

  const chatRoomPressHandler = () => {
    navigation.navigate('ChatRoom', {
      roomId: chat.roomId,
      userId: user?.id.toString(),
      opponent: chat.user,
    });
  };

  return (
    <Pressable style={styles.container} onPress={chatRoomPressHandler}>
      <View style={styles.mainBox}>
        <View style={styles.titleBox}>
          <Text style={[styles.title, {color: '#000'}]}>{chat.title}</Text>
        </View>
        <View style={styles.line} />
        <Pressable style={styles.chatBox} onPress={chatRoomPressHandler}>
          <Image
            source={require('../../assets/group_main.png')}
            style={styles.chatImage}
          />
          <View style={styles.chatRightBox}>
            <Text style={styles.chatNickname}>{chat.user.nickname}</Text>
            <Text style={styles.chatContent}>{chat.lastMessage}</Text>
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
  },
  mainBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.grey5,
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 13,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  leader: {
    fontSize: 11,
    fontWeight: '300',
  },
  chatBox: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatImage: {
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
  },
  chatRightBox: {
    paddingLeft: 12,
  },
  chatNickname: {
    fontSize: 13,
    marginBottom: 5,
  },
  chatContent: {
    fontWeight: '300',
    fontSize: 12,
    color: '#343434',
  },

  line: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: '#E4E4E4',
  },
});

export default ChatListItem;
