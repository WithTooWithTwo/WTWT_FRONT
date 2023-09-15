import {ChatPostType} from '../../util/chat';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';

const ChatPostData = ({post}: {post: ChatPostType}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        {post.image ? (
          <Image
            source={{uri: post.image}}
            resizeMethod="resize"
            style={{width: 60, height: 60, borderRadius: 5}}
          />
        ) : (
          <Image
            source={require('../../assets/group_main.png')}
            resizeMethod="resize"
            style={{width: 60, height: 60, borderRadius: 5}}
          />
        )}
      </View>
      <View style={styles.rightBox}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>
          {post.firstDay} - {post.lastDay}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    backgroundColor: Colors.grey1,
    gap: 15,
  },
  leftBox: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.grey8,
  },
  rightBox: {
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.grey10,
  },
  date: {
    fontSize: 11,
    color: Colors.grey10,
  },
});

export default ChatPostData;
