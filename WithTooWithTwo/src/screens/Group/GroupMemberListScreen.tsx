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
  const selectedGroup = groups.find(group => group.groupId == id)!;
  const members = selectedGroup.members;

  return (
    <SafeAreaView>
      <ScreenHeader title="그룹" color={Colors.grey1} isGoBack={true} />
      <View style={styles.itemBox}>
        {members.map((el, i) => (
          <Text style={styles.item} key={i}>
            {el}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemBox: {
    padding: 30,
  },
  item: {
    padding: 20,
  },
});

export default GroupMemberListScreen;
