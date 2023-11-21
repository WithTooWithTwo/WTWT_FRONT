import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {PostsType} from '../../slices/postsSlice';
import StateButton from './StateButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {PostListType} from '../../util/post';
import {detailDate} from '../../util/date';
import {Colors} from '../../constants/styles';

function PostItem(post: PostListType) {
  const navigation = useNavigation<any>();
  const postPressHandler = () => {
    navigation.navigate('PostDetail', {postId: post.id.toString()});
  };

  return (
    <Pressable onPress={postPressHandler} style={styles.postBlock}>
      <View style={styles.infoBox}>
        <View style={styles.writerBox}>
          <Image
            style={styles.writerImage}
            source={require('../../assets/group_main.png')}
          />
          <Text style={styles.writerText}>{post.writer.nickname}</Text>
        </View>
        <Text style={styles.dateText}>{detailDate(post.createdAt)}</Text>
      </View>
      <Text style={styles.titleText}>{post.title}</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>
          {post.content.length < 60
            ? post.content
            : post.content.slice(0, 60) + '...'}
        </Text>
      </View>
      <View style={styles.footerBox}>
        <StateButton
          state={post.isLightning === true ? 'thunder' : 'recruit'}
        />
        <View style={styles.iconBox}>
          <View style={styles.iconLabel}>
            <Ionicons name="eye" color="#3C70FF99" size={14} />
            <Text style={styles.iconText}>{post.hits}</Text>
          </View>
          <View style={styles.iconLabel}>
            <FontAwesome name="user-alt" color="#3C70FF99" size={13} />
            <Text style={styles.iconText}>
              {post.headCount}/{post.preferHeadCount}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  postBlock: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 15,
    height: 165,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  infoBox: {
    flexDirection: 'row',
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  writerBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  writerImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 10,
  },
  writerText: {
    fontSize: 12,
    fontWeight: '300',
  },
  dateText: {
    color: '#A7A7A7',
    fontSize: 10,
  },
  titleText: {
    paddingBottom: 5,
    fontSize: 16,
    color: Colors.grey10,
    fontWeight: '600',
    fontFamily: 'Pretendard-Regular',
  },
  contentBox: {
    marginTop: 2,
    height: 34,
    marginBottom: 3,
  },
  contentText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Pretendard-Regular',
  },
  footerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 5,
  },
  iconLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconText: {
    fontSize: 10,
    marginLeft: 7,
    color: '#AEAEAE',
    fontWeight: '400',
  },
});
export default PostItem;
