import {StyleSheet, Text, View} from 'react-native';
import {MyPageReviewType} from '../../util/user';
import {Colors} from '../../constants/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyReviewItem = ({review}: {review: MyPageReviewType}) => {
  const renderFullStar = () => {
    const fullStarCount = Math.floor(review.rate);

    const fullStar = Array.from({length: fullStarCount}, (v, i) => (
      <FontAwesome key={i} name="star" color={Colors.primary500} size={17} />
    ));

    return fullStar;
  };
  const renderHalfStar = () => {
    const halfStarCount = Math.ceil(review.rate - Math.floor(review.rate));
    const halfStar = Array.from({length: halfStarCount}, (v, i) => (
      <FontAwesome
        key={i}
        name="star-half"
        color={Colors.primary500}
        size={17}
      />
    ));
    return halfStar;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starBox}>
        {renderFullStar()}
        {renderHalfStar()}
      </View>
      <Text style={styles.comment}>'{review.comment}'</Text>
      <View style={styles.writerBox}>
        <Text style={styles.writerText}>{review.writer.nickname}</Text>
        <Text style={styles.writerText}>{review.writeAt}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  starBox: {
    flexDirection: 'row',
    gap: 3,
  },
  comment: {
    fontSize: 14,
    fontWeight: '400',
  },
  writerBox: {
    flexDirection: 'row',
    gap: 20,
  },
  writerText: {
    fontSize: 11,
    color: Colors.grey4,
  },
  line: {
    width: '100%',
    borderBottomWidth: 1,
    borderBlockColor: Colors.grey8,
    paddingBottom: 10,
  },
});

export default MyReviewItem;
