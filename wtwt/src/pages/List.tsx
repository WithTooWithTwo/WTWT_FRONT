import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import NewPost from './NewPost';
import {LoggedInParamList, RootStackParamList} from '../../App';
import ListBoard from './ListBoard';
import {MainTabParamList} from './Main';

export type ListStackParamList = {
  ListBoard: undefined;
  NewPost: undefined;
};

type ListScreenProps = NativeStackScreenProps<MainTabParamList, 'List'>;
const Stack = createNativeStackNavigator<ListStackParamList>();
function List({navigation}: ListScreenProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListBoard"
        component={ListBoard}
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

export default List;
