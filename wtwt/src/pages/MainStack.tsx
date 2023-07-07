import ListBoard from './ListBoard';
import NewPost from './NewPost';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Main, {MainTabParamList} from './Main';
import {ListStackParamList} from './List';
import {LoggedInParamList} from '../../App';

export type MainStackStackParamList = {
  Main: undefined;
  NewPost: undefined;
};
type MainStackScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'MainStack'
>;
const Stack = createNativeStackNavigator<MainStackStackParamList>();
function MainStack({navigation}: MainStackScreenProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
