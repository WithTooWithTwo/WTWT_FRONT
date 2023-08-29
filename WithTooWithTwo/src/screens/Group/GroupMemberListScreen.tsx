import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GroupDetailStackParamList} from './GroupDetailScreen';
import {RouteProp} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {Colors} from '../../constants/styles';

type GroupMemberNavigationProp = NativeStackNavigationProp<
  GroupDetailStackParamList,
  'GroupMember'
>;

type GroupMemberRouteProp = RouteProp<GroupDetailStackParamList, 'GroupMember'>;
type GroupMemberProps = {
  navigation: GroupMemberNavigationProp;
  route: GroupMemberRouteProp;
};

function GroupMemberListScreen({navigation, route}: GroupMemberProps) {
  const id = route.params?.groupId;
  const groups = useSelector((state: RootState) => state.group).groups;
  const selectedGroup = groups.find(group => group.id.toString() == id)!;
  const members = selectedGroup.members;

  return (
    <SafeAreaView style={{backgroundColor: Colors.grey1, flex: 1}}>
      <ScreenHeader title="그룹" color={Colors.grey1} isGoBack={true} />
      <View style={styles.container}>
        {members.map((el, i) => {
          return (
            <View style={styles.itemBox} key={i}>
              <View
                style={[
                  styles.image,
                  {
                    backgroundColor: Colors.memberColor[i % 9],
                  },
                ]}></View>
              <Text style={styles.item}>{el.nickname}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.grey0,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,
    gap: 20,
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 38,
  },
  item: {},
});

export default GroupMemberListScreen;
