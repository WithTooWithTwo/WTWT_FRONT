import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {Colors} from '../../constants/styles';
import MyInfo from '../../components/MyPage/MyInfo';
import MyGroup from '../../components/MyPage/MyGroup';
import MyPersonality from '../../components/MyPage/MyPersonality';
import {useEffect, useState} from 'react';
import {defaultUser, fetchUser, UserType} from '../../util/user';
import MyStyle from '../../components/MyPage/MyStyle';
import MyReview from '../../components/MyPage/MyReview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPageMainScreen = () => {
  const [user, setUser] = useState<UserType>(defaultUser);

  useEffect(() => {
    fetchUser().then(r => {
      setUser(r);
    });
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScreenHeader title="마이페이지" color={'white'} isGoBack={false} />
      <ScrollView style={styles.container}>
        <MyInfo user={user} />
        <MyGroup />
        <MyPersonality personalities={user?.personalities} />
        <MyStyle styleList={user?.styles} />
        <MyReview reviews={user?.reviews} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey1,
    marginBottom: 40,
  },
});

export default MyPageMainScreen;
