import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from '../../constants/styles';
import LinearGradient from 'react-native-linear-gradient';

function GroupItem() {
  return (
    <View style={styles.container}>
      <View style={styles.dateBox}>
        <View style={styles.dDay}>
          <Text style={styles.dDayText}>D - 10</Text>
        </View>
        <Text style={styles.dDate}>2023.02.32</Text>
      </View>
      <View style={styles.mainBox}>
        <ImageBackground
          source={require('../../assets/group_main.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.imageBox}>
            <Text style={styles.title}>독일 여행팟</Text>
            <Text style={styles.leader}>닉네임</Text>
          </View>
        </ImageBackground>

        <View style={styles.chatBox}>
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end',
    padding: 15,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 7,
  },
  leader: {
    color: '#FFF',
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
});
export default GroupItem;
