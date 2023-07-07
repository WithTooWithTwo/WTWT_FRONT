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
import StateButton from './StateButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

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
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>
          {content.length < 50 ? content : content.slice(0, 50) + '...'}
        </Text>
      </View>
      <View style={styles.footerBox}>
        <StateButton state="recruit" />
        <View style={styles.iconBox}>
          <View style={styles.iconLabel}>
            <Ionicons name="eye" color="#3C70FF90" size={14} />
            <Text style={styles.iconText}>2,290</Text>
          </View>
          <View style={styles.iconLabel}>
            <FontAwesome name="user-alt" color="#3C70FF90" size={13} />
            <Text style={styles.iconText}>
              {companions.length + 1}/{headCount}
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
    marginBottom: 10,
    height: 160,
    borderRadius: 10,
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
    color: '#A7A7A7',
    fontSize: 10,
  },
  titleText: {
    paddingBottom: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  contentBox: {
    marginTop: 5,
    height: 38,
  },
  contentText: {
    color: '#808080',
    fontSize: 12,
    fontWeight: '300',
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
