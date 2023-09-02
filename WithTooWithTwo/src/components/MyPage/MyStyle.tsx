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
    gap: 15,
  },
  styleItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
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
});

export default MyStyle;
