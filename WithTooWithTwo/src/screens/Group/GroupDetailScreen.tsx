import {View} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {GroupStackParamList} from '../Authenticated/GroupScreen';
import GroupMainScreen from './GroupMainScreen';
import GroupChatScreen from './GroupChatScreen';
import GroupMemberListScreen from './GroupMemberListScreen';
import GroupReviewScreen from './GroupReviewScreen';
import UserPageScreen from '../MyPage/UserPageScreen';

export type GroupDetailStackParamList = {
  GroupChat: {groupId: string};
  GroupMain: {groupId: string};
  GroupMember: {groupId: string};
  GroupReview: {groupId: string};
  UserPage: {userId: string};
};
export type GroupDetailScreenProps = NativeStackScreenProps<
  GroupStackParamList,
  'GroupDetail'
>;
const GroupDetailStack =
  createNativeStackNavigator<GroupDetailStackParamList>();
function GroupDetailScreen({navigation}: GroupDetailScreenProps) {
  return (
    <GroupDetailStack.Navigator>
      <GroupDetailStack.Screen
        name="GroupMain"
        component={GroupMainScreen}
        options={{headerShown: false}}
      />
      <GroupDetailStack.Screen
        name="GroupChat"
        component={GroupChatScreen}
        options={{headerShown: false}}
      />
      <GroupDetailStack.Screen
        name="GroupMember"
        component={GroupMemberListScreen}
        options={{headerShown: false}}
      />
      <GroupDetailStack.Screen
        name="GroupReview"
        component={GroupReviewScreen}
        options={{headerShown: false}}
      />
      <GroupDetailStack.Screen
        name="UserPage"
        component={UserPageScreen}
        options={{headerShown: false}}
      />
    </GroupDetailStack.Navigator>
  );
}

export default GroupDetailScreen;
