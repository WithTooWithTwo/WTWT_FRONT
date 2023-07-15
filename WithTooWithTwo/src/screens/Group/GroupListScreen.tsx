import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {fetchPost, storePosts} from '../../util/post';
import {fetchGroup, GroupType, storeGroup} from '../../util/group';
import {AxiosError} from 'axios';
import ScreenHeader from '../../components/UI/ScreenHeader';
import GroupItem from '../../components/Group/GroupItem';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {setPosts} from '../../slices/postsSlice';
import GroupOutput from '../../components/Group/GroupOutput';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {setGroups} from '../../slices/groupSlice';

function GroupListScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.group);

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

  useEffect(() => {
    async function getGroups() {
      try {
        const groups = await fetchGroup();
        console.log(groups);
        dispatch(setGroups(groups));
        // console.log(posts);
      } catch (error) {
        //setError('Could not fetch expense!');
      }
    }
    getGroups();
  }, []);

  console.log(groups.groups);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenHeader title="그룹" color="#FFFFFF" isGoBack={false} />
      {/*<Pressable onPress={onPress}>*/}
      {/*  <Text>Press!</Text>*/}
      {/*</Pressable>*/}
      <View style={styles.container}>
        <GroupOutput groups={groups.groups} />
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
