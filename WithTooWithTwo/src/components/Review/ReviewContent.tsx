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
  const [image, setImage] = useState<ImagePickerResponse>();

  const [personalList, setPersonalList] = useState<OptionType[]>([]);
  const [stylesList, setStylesList] = useState<OptionType[]>([]);

  useEffect(() => {
    const updatedReview = {...review};
    updatedReview.rate = rate;
    updatedReview.personalities = personalities;
    updatedReview.comment = comment;
    updatedReview.styles = styles;

    onChangeReview(updatedReview);
  }, [rate, personalities, styles, comment, image]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const personalities = await fetchReviewOptions('/personalities');
        const styles = await fetchReviewOptions('/styles');
        setPersonalList(personalities);
        setStylesList(styles);
      } catch (e) {}
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
      </View>

      <Text style={style.optionTitle}>동행자님의 성격</Text>
      <View style={style.optionBlock}>
        {/*<View style={style.optionItem}>*/}
        {/*  <Text style={style.optionText}>친절해요</Text>*/}
        {/*</View>*/}
        {/*<View style={style.optionItem}>*/}
        {/*  <Text style={style.optionText}>친절해요</Text>*/}
        {/*</View>*/}
      </View>

      <Text style={style.optionTitle}>동행자님의 여행스타일</Text>
      <View style={style.optionBlock}>
        {/*<View style={style.optionItem}>*/}
        {/*  <Text style={style.optionText}>약속을 잘지켜요</Text>*/}
        {/*</View>*/}
        {/*<View style={style.optionItem}>*/}
        {/*  <Text style={style.optionText}>약속을 잘지켜요</Text>*/}
        {/*</View>*/}
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
    flexDirection: 'row',
    borderRadius: 7,
    marginBottom: 30,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  optionItem: {
    padding: 12,
    backgroundColor: Colors.primary500,
  },
  optionText: {
    color: 'white',
  },
  commentBlock: {},
  commentTitle: {},
  commentText: {},
  buttonBlock: {},
  button: {},
});

export default ReviewContent;
