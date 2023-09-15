import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useCallback} from 'react';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InitialScreen from './InitialScreen';
import ThunderScreen from './ThunderScreen';
import PostListScreen from './PostListScreen';
import MainHeader from '../../components/UI/MainHeader';
import {Colors} from '../../constants/styles';

export type MainTabParamList = {
  Initial: undefined;
  PostList: undefined;
  Thunder: undefined;
};

type MainScreenProps = NativeStackScreenProps<HomeStackParamList, 'Main'>;
const Tab = createMaterialTopTabNavigator<MainTabParamList>();

function MainScreen({navigation}: MainScreenProps) {
  const toNewPost = useCallback(() => {
    navigation.navigate('NewPost');
  }, [navigation]);
  return (
    <>
      <MainHeader />
      <Tab.Navigator
        initialRouteName="Initial"
        screenOptions={{
          tabBarLabelStyle: {fontSize: 15, fontWeight: '600'},
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: Colors.grey3,
          tabBarIndicatorStyle: {
            backgroundColor: 'blue',
            height: 1.5,
            width: 60,
            marginLeft: 12,
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
          name="Thunder"
          component={ThunderScreen}
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
