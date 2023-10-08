import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GroupDetailStackParamList} from './GroupDetailScreen';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../constants/styles';
import ScreenHeader from '../../components/UI/ScreenHeader';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {fetchMemberList, GroupMember, GroupType} from '../../util/group';
import ReviewInfo from '../../components/Review/ReviewInfo';
import ReviewMember from '../../components/Review/ReviewMember';
import ReviewContent from '../../components/Review/ReviewContent';
import {AxiosError} from 'axios/index';
import axios from 'axios';
import {MyPageStackParamList} from '../Authenticated/MyPageScreen';

type GroupReviewNavigationProp = NativeStackNavigationProp<
  GroupDetailStackParamList | MyPageStackParamList,
  'GroupReview'
>;

type GroupReviewRouteProp = RouteProp<GroupDetailStackParamList, 'GroupReview'>;
type GroupReviewProps = {
  navigation: GroupReviewNavigationProp;
  route: GroupReviewRouteProp;
};

export type ReviewType = {
  rate: number;
  receiverId: number;
  personalities: number[];
  styles: number[];
  comment: string;
};

function GroupReviewScreen({navigation, route}: GroupReviewProps) {
  const id = route.params.groupId;
  const group = useSelector((state: RootState) => state.group).groups;
  const selectedGroup = group.find((g: GroupType) => g.id.toString() === id)!;
  const [members, setMembers] = useState<GroupMember[]>(selectedGroup.members);

  const initialReviewState = {
    rate: 0,
    receiverId: 0,
    personalities: [],
    styles: [],
    comment: '',
  };

  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [reviews, setReviews] = useState<ReviewType[]>(
    new Array<ReviewType>(members.length).fill(initialReviewState),
  );

  const [currentMemberReview, setCurrentMemberReview] = useState<ReviewType>(
    reviews[0],
  );

  useEffect(() => {
    const getMembers = async () => {
      try {
        let members = await fetchMemberList(id);
        setMembers(members);

        for (let i = 0; i < members.length; i++) {
          const initialReview = {
            rate: 0,
            receiverId: members[i].id,
            personalities: [],
            styles: [],
            comment: '',
          };
          setReviews(prevState => {
            const updatedReview = [...prevState];
            updatedReview[i] = initialReview;
            return updatedReview;
          });
        }
      } catch (error: any) {
        console.log('error', error.message);
      }
    };
    getMembers();
  }, []);

  useEffect(() => {
    setCurrentMemberReview(prevState => {
      const selectedMemberReview = reviews[currentMemberIndex];
      selectedMemberReview.receiverId = members[currentMemberIndex].id;
      return selectedMemberReview;
    });
  }, [currentMemberIndex]);

  useEffect(() => {
    setReviews(prevState => {
      const updatedReviews = [...prevState];
      updatedReviews[currentMemberIndex] = currentMemberReview;
      return updatedReviews;
    });
  }, [currentMemberReview]);

  const handleSelectMember = (index: number) => {
    setCurrentMemberIndex(index);
  };

  const handleSelectRating = (review: ReviewType) => {
    const updatedReview = {
      ...reviews[currentMemberIndex],
      rate: review.rate,
      personalities: review.personalities,
      styles: review.styles,
      comment: review.comment,
    };

    setReviews(prevReviews => {
      const updatedReviews = [...prevReviews];
      updatedReviews[currentMemberIndex] = updatedReview;
      return updatedReviews;
    });
  };

  const submitHandler = useCallback(() => {
    try {
      const sendReview = async () => {
        const response = await axios.post(
          'http://3.39.87.78:8080' + '/reviews/' + id,
          reviews,
        );
      };
      sendReview();

      Alert.alert('알림', '등록 되었습니다!');
      navigation.goBack();
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        console.log((errorResponse.data as any).message);
        Alert.alert('알림', (errorResponse.data as any).message);
        return;
      }
    }
  }, [reviews]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{backgroundColor: Colors.grey1, flex: 1}}>
        <ScreenHeader title="그룹" color={Colors.grey1} isGoBack={true} />
        <ScrollView style={styles.container}>
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
              member={members[currentMemberIndex]}
              nickname={members[currentMemberIndex].nickname}
              review={currentMemberReview}
              onChangeReview={handleSelectRating}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonBox}>
          <Pressable style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>리뷰 제출하기</Text>
          </Pressable>
        </View>
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
  buttonBox: {
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary500,
    borderRadius: 10,
    height: 50,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
});

export default GroupReviewScreen;
