import {View} from 'react-native';
import IconButton from '../../components/UI/IconButton';
import {useDispatch} from 'react-redux';
import {logout} from '../../slices/authSlice';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AuthenticatedTabParamList} from '../../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyPageGroupScreen from '../MyPage/MyPageGroupScreen';
import MyPageMainScreen from '../MyPage/MyPageMainScreen';
import MyPageProfileScreen from '../MyPage/MyPageProfileScreen';
import MyPageReviewScreen from '../MyPage/MyPageReviewScreen';
import {GroupType} from '../../util/group';
import GroupMainScreen from '../Group/GroupMainScreen';
import GroupMemberListScreen from '../Group/GroupMemberListScreen';
import GroupReviewScreen from '../Group/GroupReviewScreen';
import UserPageScreen from '../MyPage/UserPageScreen';

export type MyPageStackParamList = {
  MyPageMain: undefined;
  MyPageProfile: undefined;
  MyPageGroups: {groups: GroupType[]};
  MyPageReviews: undefined;
  GroupMain: {groupId: string};
  GroupMember: {groupId: string};
  GroupReview: {groupId: string};
  UserPage: {userId: string};
};

type MyPageStackProps = BottomTabScreenProps<
  AuthenticatedTabParamList,
  'MyPage'
>;

const MyPageStack = createNativeStackNavigator<MyPageStackParamList>();

function MyPageScreen({navigation}: MyPageStackProps) {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPageMain"
        component={MyPageMainScreen}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="MyPageProfile"
        component={MyPageProfileScreen}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="MyPageGroups"
        component={MyPageGroupScreen}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="MyPageReviews"
        component={MyPageReviewScreen}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="GroupMain"
        component={GroupMainScreen}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="GroupMember"
        component={GroupMemberListScreen}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="GroupReview"
        component={GroupReviewScreen}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="UserPage"
        component={UserPageScreen}
        options={{headerShown: false}}
      />
    </MyPageStack.Navigator>
  );
}

// <IconButton
//     icon="exit"
//     size={70}
//     onPress={() => {
//         dispatch(logout());
//     }}
// />
export default MyPageScreen;
