import {View} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {GroupStackParamList} from '../Authenticated/GroupScreen';
import GroupMainScreen from './GroupMainScreen';
import GroupChatScreen from './GroupChatScreen';

export type GroupDetailStackParamList = {
  GroupChat: undefined;
  GroupMain: undefined;
};
type GroupDetailScreenProps = NativeStackScreenProps<
  GroupStackParamList,
  'GroupDetail'
>;
const GroupDetailStack =
  createNativeStackNavigator<GroupDetailStackParamList>();
function GroupDetailScreen({navigation}: GroupDetailScreenProps) {
  return (
    <GroupDetailStack.Navigator>
      <GroupDetailStack.Screen name="GroupMain" component={GroupMainScreen} />
      <GroupDetailStack.Screen name="GroupChat" component={GroupChatScreen} />
    </GroupDetailStack.Navigator>
  );
}

export default GroupDetailScreen;
