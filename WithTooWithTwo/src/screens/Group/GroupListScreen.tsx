import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchGroupList} from '../../util/group';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import GroupOutput from '../../components/Group/GroupOutput';
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
        dispatch(setGroups(groups));
      } catch (error) {
        //setError('Could not fetch expense!');
      }
    }
    getGroups();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={{flex: 1}}>
        <ScreenHeader title="그룹" color="#FFFFFF" isGoBack={false} />
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
