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
import {storePosts} from '../../util/post';
import {fetchGroup, fetchGroupList, GroupType} from '../../util/group';
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
import {Colors} from '../../constants/styles';

function GroupListScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.group);

  useEffect(() => {
    async function getGroups() {
      try {
        const groups = await fetchGroupList();
        //console.log(groups);
        dispatch(setGroups(groups));
        // console.log(posts);
      } catch (error) {
        //setError('Could not fetch expense!');
      }
    }
    getGroups();
  }, []);

  //console.log(groups.groups);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={{flex: 1}}>
        <ScreenHeader title="그룹" color="#FFFFFF" isGoBack={false} />
        {/*<Pressable onPress={onPress}>*/}
        {/*  <Text>Press!</Text>*/}
        {/*</Pressable>*/}
        <View style={styles.container}>
          <GroupOutput groups={groups.groups} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey1,
  },
});

export default GroupListScreen;
