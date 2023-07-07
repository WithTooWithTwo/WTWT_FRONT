import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {LoggedInParamList} from '../../App';
import Home from './Home';
import ListBoard from './ListBoard';
import List, {ListStackParamList} from './List';
import FastMeet from './FastMeet';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainStackStackParamList} from './MainStack';

export type MainTabParamList = {
  Home: undefined;
  List: undefined;
  FastMeet: undefined;
  NewPost: undefined;
};

type MainScreenProps = NativeStackScreenProps<MainStackStackParamList, 'Main'>;
const Tab = createMaterialTopTabNavigator<MainTabParamList>();
function Main({navigation}: MainScreenProps) {
  const toNewPost = useCallback(() => {
    navigation.navigate('NewPost');
  }, [navigation]);
  return (
    <>
      <View style={styles.headerZone}>
        <Text style={styles.headerText}>전체 </Text>
      </View>
      <Tab.Navigator
        initialRouteName="List"
        screenOptions={{
          tabBarLabelStyle: {color: '#808080', fontSize: 14},
          tabBarIndicatorStyle: {
            backgroundColor: 'blue',
            height: 1,
            width: 30,
            marginLeft: 25,
          },
          tabBarStyle: {
            width: '100%',
            borderBottomColor: '#80808020',
            borderBottomWidth: 1,
          },
          tabBarItemStyle: {width: 80, paddingHorizontal: 8},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{tabBarLabel: '홈'}}
        />

        <Tab.Screen
          name="FastMeet"
          component={FastMeet}
          options={{tabBarLabel: '번개만남'}}
        />
        <Tab.Screen
          name="List"
          component={List}
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
    backgroundColor: '#c9c9c9',
    position: 'absolute',
    right: 30,
    bottom: 30,
    padding: 15,
    borderRadius: 50,
  },
});

export default Main;
