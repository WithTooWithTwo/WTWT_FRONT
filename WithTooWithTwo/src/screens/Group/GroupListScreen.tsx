import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {storePosts} from '../../util/post';
import {storeGroup} from '../../util/group';
import {AxiosError} from 'axios';
import ScreenHeader from '../../components/UI/ScreenHeader';
import GroupItem from '../../components/Group/GroupItem';

function GroupListScreen() {
  const onPress = useCallback(async () => {
    try {
      const response = await storeGroup();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        console.log((errorResponse.data as any).message);
        Alert.alert('알림', (errorResponse.data as any).message);
      }
    }
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenHeader title="그룹" color="#FFFFFF" isGoBack={false} />
      <View style={styles.container}>
        <GroupItem />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
});

export default GroupListScreen;
