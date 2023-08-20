import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from '../../constants/styles';
import {MyGroupType} from '../../util/group';
import {useNavigation} from '@react-navigation/native';

function GroupItem(group: MyGroupType) {
  const navigation = useNavigation<any>();
  const groupMainPressHandler = () => {
    navigation.navigate('GroupDetail', {
      screen: 'GroupMain',
      params: {groupId: group.id.toString()},
    });
    //console.log(group.id.toString());
  };

  const groupChatPressHandler = () => {
    navigation.navigate('GroupDetail', {
      screen: 'GroupChat',
      params: {groupId: group.id.toString()},
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateBox}>
        <View style={styles.dDay}>
          <Text style={styles.dDayText}>
            D {group.dday < 0 ? `+ ${group.dday * -1}` : `- ${group.dday}`}
          </Text>
        </View>
        <Text style={styles.dDate}>{group.firstDay}</Text>
      </View>
      <View style={styles.mainBox}>
        {group.image && (
          <Pressable onPress={groupMainPressHandler}>
            <ImageBackground
              source={
                group.image
                  ? {uri: group.image}
                  : require('../../assets/group_main.png')
              }
              resizeMode="cover"
              style={styles.image}>
              <View style={styles.imageBox}>
                <Text style={[styles.title, {color: '#FFF'}]}>
                  {group.name}
                </Text>
                <Text style={[styles.leader, {color: '#FFF'}]}>
                  {group.leader.nickname}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        )}
        {!group.image && (
          <View>
            <Pressable style={styles.titleBox} onPress={groupMainPressHandler}>
              <Text style={[styles.title, {color: '#000'}]}>{group.name}</Text>
              <Text style={[styles.leader, {color: '#000'}]}>
                {/*{group.leader.nickname}*/}
              </Text>
            </Pressable>
            <View style={styles.line} />
          </View>
        )}
        <Pressable style={styles.chatBox} onPress={groupChatPressHandler}>
          <Image
            source={require('../../assets/group_main.png')}
            style={styles.chatImage}
          />
          <View style={styles.chatRightBox}>
            <Text style={styles.chatNickname}>닉네임</Text>
            <Text style={styles.chatContent}>
              안녕하세요! 글 보고 연락드려요!
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  mainBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  dateBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  dDay: {
    padding: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginRight: 10,
  },
  dDayText: {
    color: Colors.primary500,
    fontWeight: '600',
    fontSize: 15,
  },
  dDate: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.32,
    color: '#868B94',
  },
  image: {
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 7,
  },
  leader: {
    fontSize: 11,
    fontWeight: '300',
  },
  chatBox: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatImage: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  chatRightBox: {
    paddingLeft: 12,
    paddingTop: 4,
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
  titleBox: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 13,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  line: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: '#E4E4E4',
  },
});
export default GroupItem;
