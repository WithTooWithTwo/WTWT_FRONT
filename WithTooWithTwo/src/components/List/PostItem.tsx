import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {PostsType} from '../../slices/postsSlice';

function PostItem({
  id,
  category_id,
  writer_id,
  title,
  content,
  firstDay,
  lastDay,
  headCount,
  companions,
  preferGender,
  preferMinAge,
  preferMaxAge,
}: PostsType) {
  const navigation = useNavigation<any>();
  const postPressHandler = () => {
    navigation.navigate('PostDetail', {postId: id});
  };

  return (
    <Pressable onPress={postPressHandler} style={styles.postBlock}>
      <View style={styles.infoBox}>
        <Text style={styles.userText}>{writer_id}</Text>
        <Text style={styles.dateText}>1시간 전</Text>
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.innerText}>{content}</Text>
      <View style={styles.footerBox}>
        <Text style={styles.stateText}>모집 중</Text>
        <Text style={styles.commentText}>1/{headCount}</Text>
        <Text style={styles.likeText}>6</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  postZone: {
    marginHorizontal: 25,
    marginTop: 13,
  },
  postBlock: {
    backgroundColor: '#D9D9D980',
    padding: 20,
    marginBottom: 15,
  },
  infoBox: {
    flexDirection: 'row',
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  userText: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 10,
  },
  titleText: {
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  innerText: {
    paddingBottom: 13,
    color: '#B1B1B1',
    fontSize: 12,
  },
  footerBox: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#C9C9C9',
    paddingTop: 12,
  },
  stateText: {
    flex: 13,
  },
  commentText: {
    flex: 1,
    paddingRight: 10,
  },
  likeText: {
    flex: 1,
  },
  absoluteView: {
    backgroundColor: '#c9c9c9',
    position: 'absolute',
    right: 30,
    bottom: 30,
    padding: 15,
    borderRadius: 50,
  },
});
export default PostItem;
