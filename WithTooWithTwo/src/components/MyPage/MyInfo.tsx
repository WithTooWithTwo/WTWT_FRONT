import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import {fetchUser, UserType} from '../../util/user';
import LoadingOverlay from '../UI/LoadingOverlay';
import LinearGradient from 'react-native-linear-gradient';
import {MyPageStackParamList} from '../../screens/Authenticated/MyPageScreen';

const MyInfo = ({user, isMe}: {user: UserType; isMe?: boolean}) => {
  const navigation = useNavigation<any>();

  const groupPressHandler = () => {
    navigation.navigate('Group');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <View style={styles.leftBox}></View>
        <View style={styles.rightBox}>
          <View style={styles.nicknameBlock}>
            <Text style={styles.nicknameText}>{user?.nickname}님</Text>
            <Ionicons name={'chevron-forward'} color={Colors.grey4} size={17} />
          </View>
          <View style={styles.gaugeBox}>
            <LinearGradient
              colors={[
                Colors.primary500,
                Colors.primary500,
                Colors.primary500,
                Colors.grey6,
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[
                {
                  width: user ? user?.rate! * 40 : 0,
                  height: 10,
                  overflow: 'hidden',
                  borderRadius: 5,
                },
                styles.gaugeBar,
              ]}
            />
          </View>
          <View style={styles.ratingBlock}>
            <Ionicons name={'star'} color={Colors.primary400} size={13} />
            <Text style={styles.ratingText}>{user?.rate ? user?.rate : 0}</Text>
          </View>
        </View>
      </View>
      <View style={styles.dataBox}>
        <Pressable style={styles.dataBlock} onPress={groupPressHandler}>
          <Text style={styles.dataTitle}>동행 수</Text>
          <View style={styles.dataItemBlock}>
            <Icon name={'users'} color={Colors.primary500} size={25} />
            <Text style={styles.dataItemText}>{user?.countsOfGroups}</Text>
          </View>
        </Pressable>
        <View style={styles.dataBlock}>
          <Text style={styles.dataTitle}>
            {isMe !== false ? '나의 글' : user.nickname + '의 글'}
          </Text>
          <View style={styles.dataItemBlock}>
            <Ionicons
              name={'document-text-sharp'}
              color={Colors.primary500}
              size={25}
            />
            <Text style={styles.dataItemText}>{user?.countsOfPosts}</Text>
          </View>
        </View>
        <View style={styles.dataBlock}>
          <Text style={styles.dataTitle}>받은 리뷰</Text>
          <View style={styles.dataItemBlock}>
            <Ionicons name={'folder'} color={Colors.primary500} size={25} />
            <Text style={styles.dataItemText}>{user?.countsOfReviews}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 24,
    gap: 20,
  },
  userBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  leftBox: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: Colors.grey5,
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  nicknameBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  nicknameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  gaugeBox: {
    width: 200,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.grey6,
  },
  gaugeBar: {},
  ratingBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: Colors.grey4,
  },
  dataBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 37,
    borderRadius: 10,
    backgroundColor: Colors.grey1,
  },
  dataBlock: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    gap: 12,
  },
  dataTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.grey4,
  },
  dataItemBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 13,
  },
  dataItemText: {
    color: Colors.primary500,
    fontWeight: '600',
    fontSize: 15,
  },
});

export default MyInfo;
