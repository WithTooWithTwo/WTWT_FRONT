import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';
import {MyPageReviewType} from '../../util/user';
import MyReviewItem from './MyReviewItem';

const MyReview = ({
  reviews,
}: {
  reviews: MyPageReviewType[] | null | undefined;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>받은 리뷰</Text>
        <Text style={styles.titleCount}>{reviews?.length}건</Text>
      </View>
      <View style={styles.itemBox}>
        {reviews?.map((review, i) => (
          <MyReviewItem key={i} review={review} />
        ))}
      </View>
      {reviews?.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>받은 리뷰가 없어요!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 15,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  titleCount: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.primary500,
  },
  itemBox: {
    gap: 10,
  },
  emptyBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 13,
    color: Colors.grey7,
  },
});
export default MyReview;
