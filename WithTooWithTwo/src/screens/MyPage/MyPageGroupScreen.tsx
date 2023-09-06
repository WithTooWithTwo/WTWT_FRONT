import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/styles';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {GroupType} from '../../util/group';
import MyGroupItem from '../../components/MyPage/MyGroupItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import {RouteProp} from '@react-navigation/native';
import {MyPageStackParamList} from '../Authenticated/MyPageScreen';

type MyPageGroupScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PostDetail'
>;
type MyPageGroupScreenRouteProp = RouteProp<
  MyPageStackParamList,
  'MyPageGroups'
>;

type MyPageGroupScreenProps = {
  navigation: MyPageGroupScreenNavigationProp;
  route: MyPageGroupScreenRouteProp;
};

const MyPageGroupScreen = ({navigation, route}: MyPageGroupScreenProps) => {
  const groups = route.params?.groups;
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScreenHeader color={'white'} isGoBack={true} title={'함께한 그룹'} />
      <View style={styles.container}>
        {groups &&
          groups.map(group => <MyGroupItem key={group.id} group={group} />)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: '100%',
    padding: 24,
  },
});

export default MyPageGroupScreen;
