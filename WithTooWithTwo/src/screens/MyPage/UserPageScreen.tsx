import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import {RouteProp} from '@react-navigation/native';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ScreenHeader from '../../components/UI/ScreenHeader';
import MyInfo from '../../components/MyPage/MyInfo';
import MyPersonality from '../../components/MyPage/MyPersonality';
import MyStyle from '../../components/MyPage/MyStyle';
import MyReview from '../../components/MyPage/MyReview';
import {useEffect, useState} from 'react';
import {
  defaultUser,
  fetchAnotherUser,
  fetchUser,
  UserType,
} from '../../util/user';
import {Colors} from '../../constants/styles';
import {GroupDetailStackParamList} from '../Group/GroupDetailScreen';
import {ChatStackParamList} from '../Authenticated/ChatScreen';

type UserPageNavigationProp = NativeStackNavigationProp<
  HomeStackParamList | GroupDetailStackParamList | ChatStackParamList,
  'UserPage'
>;
type UserPageRouteProp = RouteProp<
  HomeStackParamList | GroupDetailStackParamList | ChatStackParamList,
  'UserPage'
>;

type UserPageProps = {
  navigation: UserPageNavigationProp;
  route: UserPageRouteProp;
};
const UserPageScreen = ({navigation, route}: UserPageProps) => {
  const userId = route.params.userId;
  const [user, setUser] = useState<UserType>(defaultUser);

  useEffect(() => {
    fetchAnotherUser(userId).then(r => {
      setUser(r);
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScreenHeader title={user.nickname} color={'white'} isGoBack={true} />
      <ScrollView style={styles.container}>
        <MyInfo user={user} isMe={false} />
        <MyPersonality personalities={user?.personalities} />
        <MyStyle styleList={user?.styles} />
        <MyReview reviews={user?.reviews} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey1,
    paddingBottom: 40,
  },
});
export default UserPageScreen;
