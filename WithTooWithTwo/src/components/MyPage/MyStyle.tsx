import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';
import {MyPageOptionType} from '../../util/user';

const MyStyle = ({
  styleList,
}: {
  styleList: MyPageOptionType[] | null | undefined;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>여행 스타일</Text>
      </View>
      <View style={styles.itemBox}>
        {styleList?.map((item, i) => (
          <View key={i} style={styles.styleItem}>
            <Text style={styles.itemText}>{item.type}</Text>
          </View>
        ))}
      </View>
      {styleList?.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>스타일 리뷰가 없어요!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 10,
    gap: 15,
  },
  titleBox: {
    gap: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13,
  },
  styleItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 7,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemText: {
    fontSize: 14,
    color: Colors.grey10,
  },
  emptyBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: Colors.grey7,
  },
});

export default MyStyle;
