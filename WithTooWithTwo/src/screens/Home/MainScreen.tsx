import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useCallback} from 'react';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InitialScreen from './InitialScreen';
import FastMeetScreen from './FastMeetScreen';
import PostListScreen from './PostListScreen';
import MainHeader from '../../components/UI/MainHeader';

export type MainTabParamList = {
  Initial: undefined;
  PostList: undefined;
  FastMeet: undefined;
};

type MainScreenProps = NativeStackScreenProps<HomeStackParamList, 'Main'>;
const Tab = createMaterialTopTabNavigator<MainTabParamList>();

function CustomTabBar() {
  return null;
}
function MainScreen({navigation}: MainScreenProps) {
  const toNewPost = useCallback(() => {
    navigation.navigate('NewPost');
  }, [navigation]);
  return (
    <>
      <MainHeader title="전체" />
      <Tab.Navigator
        initialRouteName="Initial"
        screenOptions={{
          tabBarLabelStyle: {fontSize: 15},
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#808080',
          tabBarIndicatorStyle: {
            backgroundColor: 'blue',
            height: 1.5,
            width: 40,
            marginLeft: 20,
          },
          tabBarStyle: {
            width: '100%',
            borderBottomColor: '#80808020',
            borderBottomWidth: 1,
          },
          tabBarItemStyle: {width: 80, paddingHorizontal: 8},
        }}>
        <Tab.Screen
          name="Initial"
          component={InitialScreen}
          options={{tabBarLabel: '홈'}}
        />

        <Tab.Screen
          name="FastMeet"
          component={FastMeetScreen}
          options={{tabBarLabel: '번개만남'}}
        />
        <Tab.Screen
          name="PostList"
          component={PostListScreen}
          options={{tabBarLabel: '게시판'}}
        />
      </Tab.Navigator>
      <View style={styles.absoluteView}>
        <Pressable onPress={toNewPost}>
          <Icon name="pencil" size={30} color="white" />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {},
  container: {},
  headerZone: {
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingTop: 60,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
  absoluteView: {
    backgroundColor: '#3C70FF',
    position: 'absolute',
    right: 30,
    bottom: 30,
    padding: 15,
    borderRadius: 50,
  },
});

export default MainScreen;
