import {View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AuthenticatedTabParamList} from '../../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GroupListScreen from '../Group/GroupListScreen';
import GroupMainScreen from '../Group/GroupMainScreen';
import GroupDetailScreen from '../Group/GroupDetailScreen';

type GroupStackScreenProps = BottomTabScreenProps<
  AuthenticatedTabParamList,
  'Group'
>;

export type GroupStackParamList = {
  GroupList: undefined;
  GroupDetail: undefined;
};

const GroupStack = createNativeStackNavigator<GroupStackParamList>();

function GroupScreen({navigation}: GroupStackScreenProps) {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="GroupList"
        component={GroupListScreen}
        options={{headerShown: false}}
      />
      <GroupStack.Screen
        name="GroupDetail"
        component={GroupDetailScreen}
        options={{headerShown: false}}
      />
    </GroupStack.Navigator>
  );
}

export default GroupScreen;
