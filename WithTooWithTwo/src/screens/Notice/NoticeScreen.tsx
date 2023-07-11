import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from '../Home/MainScreen';
import NewsScreen from './NewsScreen';
import InvitationsScreen from './InvitationsScreen';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export type NoticeScreenParamList = {
  News: undefined;
  Invitations: undefined;
};

function NoticeScreen() {
  const Tab = createMaterialTopTabNavigator<NoticeScreenParamList>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ScreenHeader title="알림" isGoBack={true} />
        <Tab.Navigator
          style={{marginHorizontal: 25}}
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: '#3C70FF',
              height: 2,
              borderRadius: 10,
            },
            tabBarStyle: {
              borderBottomColor: '#80808020',
              borderBottomWidth: 1,
              paddingVertical: 5,
              marginHorizontal: 10,
            },
            tabBarLabelStyle: {
              fontSize: 16,
            },
          }}>
          <Tab.Screen
            name="News"
            component={NewsScreen}
            options={{tabBarLabel: '소식'}}
          />
          <Tab.Screen
            name="Invitations"
            component={InvitationsScreen}
            options={{tabBarLabel: '초대'}}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default NoticeScreen;
