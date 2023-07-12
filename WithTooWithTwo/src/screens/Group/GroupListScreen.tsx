import {Alert, Pressable, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {storePosts} from '../../util/post';
import {storeGroup} from '../../util/group';
import {AxiosError} from 'axios';

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
    <View>
      <Text>GroupList</Text>
      {/*<Pressable onPress={onPress}>*/}
      {/*  <Text>make group</Text>*/}
      {/*</Pressable>*/}
    </View>
  );
}

export default GroupListScreen;
