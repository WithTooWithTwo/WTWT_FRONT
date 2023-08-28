import {ReviewType} from '../../screens/Group/GroupReviewScreen';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {fetchReviewOptions, OptionType} from '../../util/review';
import {Colors} from '../../constants/styles';
import {fetchAnotherUser} from '../../util/user';

const ReviewContent = ({
  review,
  nickname,
  onChangeReview,
}: {
  review: ReviewType;
  nickname: string;
  onChangeReview: (review: ReviewType) => void;
}) => {
  const [rate, setRate] = useState(0);
  const [personalities, setPersonalities] = useState<number[]>([]);
  const [styles, setStyles] = useState<number[]>([]);
  const [comment, setComment] = useState('');

  const [personalList, setPersonalList] = useState<OptionType[]>([]);
  const [stylesList, setStylesList] = useState<OptionType[]>([]);

  useEffect(() => {
    // fetchAnotherUser(review.receiverId.toString()).then(r => {
    //   setNickname(r.nickname);
    // });

    // 상위 컴포넌트로부터 받은 review prop을 이용하여 리뷰 정보를 표시
    setRate(review.rate);
    setPersonalities(review.personalities);
    setStyles(review.styles);
    setComment(review.comment);
  }, [review]);

  useEffect(() => {
    const updatedReview: ReviewType = {
      ...review,
      rate: rate,
      personalities: personalities,
      comment: comment,
      styles: styles,
    };
    onChangeReview(updatedReview);
  }, [rate, personalities, styles, comment]);

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

  const selectPersonalHandler = (id: number) => {
    setPersonalities(prevState => {
      if (prevState.indexOf(id) > -1) {
        let updated = [...prevState];
        updated = updated.filter(p => p !== id);
        return updated;
      } else {
        const updated = [...prevState];
        updated.push(id);
        return updated;
      }
    });
  };

  const selectStyleHandler = (id: number) => {
    setStyles(prevState => {
      if (prevState.indexOf(id) > -1) {
        let updated = [...prevState];
        updated = updated.filter(p => p !== id);
        return updated;
      } else {
        const updated = [...prevState];
        updated.push(id);
        return updated;
      }
    });
  };

  const changeContentHandler = useCallback((text: string) => {
    setComment(text);
  }, []);

  return (
    <View style={style.container}>
      <View style={style.ratingBlock}>
        <View style={style.image}></View>
        <Text style={style.nickname}>{nickname}</Text>
        <View style={style.star}>
          <StarRating
            rating={rate}
            onChange={setRate}
            color={Colors.primary500}
            starSize={32}
          />
        </View>
      </View>

      <Text style={style.optionTitle}>동행자님의 성격</Text>
      <View style={style.optionBlock}>
        {personalList.map(option => (
          <Pressable
            key={option.id}
            style={
              personalities.find(p => p === option.id)
                ? style.clickedOptionItem
                : style.optionItem
            }
            onPress={() => selectPersonalHandler(option.id)}>
            <Text
              style={
                personalities.find(p => p === option.id)
                  ? style.clickedOptionText
                  : style.optionText
              }>
              {option.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={style.optionTitle}>동행자님의 여행스타일</Text>
      <View style={style.optionBlock}>
        <View style={style.optionBlock}>
          {stylesList.map(option => (
            <Pressable
              key={option.id}
              style={
                styles.find(p => p === option.id)
                  ? style.clickedOptionItem
                  : style.optionItem
              }
              onPress={() => selectStyleHandler(option.id)}>
              <Text
                style={
                  styles.find(p => p === option.id)
                    ? style.clickedOptionText
                    : style.optionText
                }>
                {option.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={style.optionTitle}>상세한 후기도 남겨보세요</Text>
      <View style={style.contentBlock}>
        <TextInput
          value={comment}
          style={style.contentBox}
          placeholder="내용을 작성해주세요"
          multiline={true}
          onChangeText={changeContentHandler}
          blurOnSubmit={false}
          clearButtonMode="while-editing"
        />
      </View>
      {/*<ScrollView horizontal={true}>*/}
      {/*  <View style={style.imageBox}>*/}
      {/*    <View style={style.imagePicker}>*/}
      {/*      <OneImagePicker onSetImages={setImageHandler} />*/}
      {/*    </View>*/}
      {/*    {image !== undefined && image.length > 0 && (*/}
      {/*      <RenderImages images={image} size={100} />*/}
      {/*    )}*/}
      {/*  </View>*/}
      {/*</ScrollView>*/}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  ratingBlock: {
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 10,
    gap: 10,
    backgroundColor: '#D9D9D940',
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
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
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
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 15,
  },
  optionItem: {
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 7,
    backgroundColor: Colors.grey6,
  },
  clickedOptionItem: {
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 7,
    backgroundColor: Colors.primary500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.grey3,
  },

  clickedOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  commentBlock: {},
  commentTitle: {},
  commentText: {},
  buttonBlock: {},
  button: {},
  contentBlock: {
    marginTop: 10,
    height: 230,
    backgroundColor: '#D9D9D950',
    borderRadius: 13,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentBox: {
    flexShrink: 1,
  },
  imageBox: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: Colors.grey5,
  },
});

export default ReviewContent;
