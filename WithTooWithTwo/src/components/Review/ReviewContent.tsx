import {GroupMember} from '../../util/group';
import {ReviewType} from '../../screens/Group/GroupReviewScreen';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import StarRating from 'react-native-star-rating-widget';
import {fetchReviewOptions, OptionType} from '../../util/review';
import {Colors} from '../../constants/styles';

const ReviewContent = ({
  review,
  onChangeReview,
}: {
  review: ReviewType;
  onChangeReview: (review: ReviewType) => void;
}) => {
  const [rate, setRate] = useState(0);
  const [personalities, setPersonalities] = useState<number[]>([]);
  const [styles, setStyles] = useState<number[]>([]);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<string[]>();

  const [personalList, setPersonalList] = useState<OptionType[]>([]);
  const [stylesList, setStylesList] = useState<OptionType[]>([]);

  useEffect(() => {
    // 상위 컴포넌트로부터 받은 review prop을 이용하여 리뷰 정보를 표시합니다.
    setRate(review.rate);
    setPersonalities(review.personalities);
    setStyles(review.styles);
    setComment(review.comment);
    setImage(review.images);
  }, [review]);

  useEffect(() => {
    // console.log(review);
    const updatedReview: ReviewType = {
      ...review,
      rate: rate,
      personalities: personalities,
      comment: comment,
      styles: styles,
    };
    // console.log(updatedReview);
    onChangeReview(updatedReview);
  }, [rate, personalities, styles, comment, image]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const personalities = await fetchReviewOptions('/personalities');
        const styles = await fetchReviewOptions('/styles');
        setPersonalList(personalities);
        setStylesList(styles);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  const handleSelectRating = (rate: number) => {
    const updatedReview = {...review};
    updatedReview.rate = rate;
    onChangeReview(updatedReview);
  };

  return (
    <View style={style.container}>
      <View style={style.ratingBlock}>
        <View style={style.image}></View>
        <Text style={style.nickname}></Text>
        <StarRating rating={rate} onChange={setRate} />
        <Text>{rate}</Text>
      </View>

      <Text style={style.optionTitle}>동행자님의 성격</Text>
      <View style={style.optionBlock}>
        {personalList.map(option => (
          <Pressable key={option.id} style={style.optionItem}>
            <Text style={style.optionText}>{option.name}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={style.optionTitle}>동행자님의 여행스타일</Text>
      <View style={style.optionBlock}>
        <View style={style.optionBlock}>
          {stylesList.map(option => (
            <Pressable key={option.id} style={style.optionItem}>
              <Text style={style.optionText}>{option.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={style.optionTitle}>상세한 후기도 남겨보세요</Text>
      <View style={style.commentBlock}>
        <View style={style.commentText}></View>
      </View>
      <View style={style.buttonBlock}>
        <Pressable style={style.button}>
          {/*<Text>리뷰 남기기</Text>*/}
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  ratingBlock: {
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    height: 64,
    width: 64,
    overflow: 'hidden',
    borderRadius: 64,
    backgroundColor: '#D9D9D9',
  },
  nickname: {
    fontSize: 14,
  },
  star: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  optionBlock: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 7,
    marginBottom: 30,
    gap: 10,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  optionItem: {
    padding: 12,
    borderRadius: 7,
    backgroundColor: Colors.primary500,
  },

  optionText: {
    fontWeight: '600',
    color: 'white',
  },
  commentBlock: {},
  commentTitle: {},
  commentText: {},
  buttonBlock: {},
  button: {},
});

export default ReviewContent;
