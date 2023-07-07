import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/Root/LoginScreen';
import SignUpScreen from './src/screens/Root/SignUpScreen';
import HomeScreen from './src/screens/Authenticated/HomeScreen';
import ChatScreen from './src/screens/Authenticated/ChatScreen';
import GroupScreen from './src/screens/Authenticated/GroupScreen';
import MyPageScreen from './src/screens/Authenticated/MyPageScreen';
import {RootState, store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {authenticate, logout} from './src/slices/authSlice';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        options={{headerShown: false}}
      />
      <AuthenticatedTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <AuthenticatedTab.Screen
        name="Group"
        component={GroupScreen}
        options={{headerShown: false}}
      />
      <AuthenticatedTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{headerShown: false}}
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

  return (
    <NavigationContainer>
      {!authState.isAuthenticated && <RootStackNavigator />}
      {authState.isAuthenticated && <AuthenticatedTabNavigator />}
    </NavigationContainer>
  );
};

function App() {
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

export default App;
