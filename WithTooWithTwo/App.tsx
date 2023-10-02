import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/Root/LoginScreen';
import SignUpScreen from './src/screens/Root/SignUpScreen';
import HomeScreen from './src/screens/Authenticated/HomeScreen';
import ChatScreen from './src/screens/Authenticated/ChatScreen';
import GroupScreen from './src/screens/Authenticated/GroupScreen';
import MyPageScreen from './src/screens/Authenticated/MyPageScreen';
import {RootState, store} from './src/store/store';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {authenticate, logout} from './src/slices/authSlice';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNEventSource from 'react-native-event-source';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type AuthenticatedTabParamList = {
  Home: undefined;
  Chat: undefined;
  Group: undefined;
  MyPage: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthenticatedTab = createBottomTabNavigator<AuthenticatedTabParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

const AuthenticatedTabNavigator = () => {
  return (
    <AuthenticatedTab.Navigator>
      <AuthenticatedTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused}) => {
            return (
              <Ionicons
                name="home-sharp"
                size={17}
                color={focused ? '#3C70FF' : 'grey'}
              />
            );
          },
          tabBarLabel: '홈',
          unmountOnBlur: true,
          tabBarLabelStyle: {fontSize: 11},
        }}
      />
      <AuthenticatedTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({size, focused}) => {
            return (
              <Ionicons
                name="chatbox-ellipses"
                size={17}
                color={focused ? '#3C70FF' : 'grey'}
              />
            );
          },
          tabBarLabel: '채팅',
          tabBarLabelStyle: {fontSize: 11},
        }}
      />
      <AuthenticatedTab.Screen
        name="Group"
        component={GroupScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({size, focused}) => {
            return (
              <AntDesign
                name="appstore1"
                size={17}
                color={focused ? '#3C70FF' : 'grey'}
              />
            );
          },
          tabBarLabel: '그룹',
          tabBarLabelStyle: {fontSize: 11},
        }}
      />
      <AuthenticatedTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({size, focused}) => {
            return (
              <FontAwesome5
                name="user-alt"
                size={17}
                color={focused ? '#3C70FF' : 'grey'}
              />
            );
          },
          tabBarLabel: '마이페이지',
          tabBarLabelStyle: {fontSize: 11},
        }}
      />
    </AuthenticatedTab.Navigator>
  );
};

const Navigation = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        dispatch(authenticate(storedToken));
      }
    }
    fetchToken();
  }, []);

  //dispatch(logout());

  return (
    <NavigationContainer>
      {!authState.isAuthenticated && <RootStackNavigator />}
      {authState.isAuthenticated && <AuthenticatedTabNavigator />}
    </NavigationContainer>
  );
};

function App() {
  // useEffect(() => {
  //   const eventSource = new RNEventSource(
  //     'http://3.39.87.78:8080/notifications/subscribe',
  //     {
  //       headers: {
  //         'Content-Type': 'text/event-stream',
  //       },
  //     },
  //   );
  //
  //   eventSource.addEventListener('message', event => {
  //     const data = JSON.parse(event!.data!);
  //     // Handle the incoming alert data here and update your UI as needed
  //     console.log('Received alert:', data);
  //   });
  //
  //   eventSource.addEventListener('error', error => {
  //     console.error('SSE error:', error);
  //   });
  //
  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

export default App;
