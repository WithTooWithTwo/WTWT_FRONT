import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GroupDetailStackParamList} from './GroupDetailScreen';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../constants/styles';
import ScreenHeader from '../../components/UI/ScreenHeader';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {PostsType} from '../../slices/postsSlice';
import {fetchOnePost} from '../../util/post';
import {GroupType} from '../../util/group';

type GroupReviewNavigationProp = NativeStackNavigationProp<
  GroupDetailStackParamList,
  'GroupReview'
>;

type GroupReviewRouteProp = RouteProp<GroupDetailStackParamList, 'GroupReview'>;
type GroupReviewProps = {
  navigation: GroupReviewNavigationProp;
  route: GroupReviewRouteProp;
};

function GroupReviewScreen({navigation, route}: GroupReviewProps) {
  const id = route.params?.groupId;
  const group = useSelector((state: RootState) => state.group).groups;
  const selectedGroup = group.filter((g: GroupType) => g.id.toString() === id);

  return (
    <View>
      <SafeAreaView style={{backgroundColor: Colors.grey1}}>
        <ScreenHeader title="그룹" color={Colors.grey1} isGoBack={true} />
        <ScrollView></ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default GroupReviewScreen;
