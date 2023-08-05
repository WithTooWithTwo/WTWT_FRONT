import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GroupDetailStackParamList} from './GroupDetailScreen';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../constants/styles';
import ScreenHeader from '../../components/UI/ScreenHeader';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {PostsType} from '../../slices/postsSlice';
import {fetchOnePost} from '../../util/post';
import {GroupType} from '../../util/group';
import ReviewInfo from '../../components/Review/ReviewInfo';
import ReviewMember from '../../components/Review/ReviewMember';
import ReviewContent from '../../components/Review/ReviewContent';

type GroupReviewNavigationProp = NativeStackNavigationProp<
  GroupDetailStackParamList,
  'GroupReview'
>;

type GroupReviewRouteProp = RouteProp<GroupDetailStackParamList, 'GroupReview'>;
type GroupReviewProps = {
  navigation: GroupReviewNavigationProp;
  route: GroupReviewRouteProp;
};

export type ReviewType = {
  rate: number;
  receiverId: string;
  personalities: number[];
  styles: number[];
  comment: string;
  images: string[];
};

function GroupReviewScreen({navigation, route}: GroupReviewProps) {
  const id = route.params?.groupId;
  const group = useSelector((state: RootState) => state.group).groups;
  const selectedGroup = group.find((g: GroupType) => g.id.toString() === id)!;
  const members = selectedGroup.members;
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [currentMember, setCurrentMember] = useState<ReviewType>(reviews[0]);

  useEffect(() => {
    setCurrentMember(prevState => {
      const selectedMemberReview = reviews[currentMemberIndex];
      return selectedMemberReview;
    });
  }, [currentMemberIndex]);

  useEffect(() => {
    setReviews(prevState => {
      const updatedReviews = [...prevState];
      updatedReviews[currentMemberIndex] = currentMember;
      return updatedReviews;
    });
  }, [currentMember]);

  // console.log(selectedGroup);

  const handleSelectMember = (index: number) => {
    setCurrentMemberIndex(index);
  };

  const handleSelectRating = (review: ReviewType) => {
    setCurrentMember(review);
  };

  return (
    <View>
      <SafeAreaView style={{backgroundColor: Colors.grey1}}>
        <ScreenHeader title="그룹" color={Colors.grey1} isGoBack={true} />
        <ScrollView>
          <ReviewInfo group={selectedGroup} />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>즐거운 여행이었나요?</Text>
            <Text style={styles.headerCaption}>
              함께 동행한 사람들의 별점을 남겨보세요!
            </Text>
          </View>
          <View style={styles.body}>
            <ReviewMember
              members={members}
              onSelectMember={handleSelectMember}
            />
            <ReviewContent
              review={currentMember}
              onChangeReview={handleSelectRating}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  headerCaption: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.grey2,
  },
  body: {
    paddingHorizontal: 24,
  },
});

export default GroupReviewScreen;
