import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';

import {useState} from 'react';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Main from './src/pages/Main';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import Chat from './src/pages/Chat';
import Group from './src/pages/Group';
import MyPage from './src/pages/MyPage';

// 타입은 문서에 정의된 거 사용하는 것임
// 탭과 스택 네비게이터를 동시에 사용 가능
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !state.user.email);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="채팅"
            component={Chat}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="그룹"
            component={Group}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="마이페이지"
            component={MyPage}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
