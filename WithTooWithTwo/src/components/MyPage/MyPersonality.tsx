import {StyleSheet, Text, View} from 'react-native';
import {MyPageOptionType} from '../../util/user';
import {Colors} from '../../constants/styles';

const MyPersonality = ({
  personalities,
}: {
  personalities: MyPageOptionType[] | null | undefined;
}) => {
  const getSumOfPersonalities = () => {
    return personalities?.reduce((acc, cur) => acc + cur.count, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>여행 성격</Text>
        <Text style={styles.titleCount}>{getSumOfPersonalities()}개</Text>
      </View>
      <View style={styles.itemBox}>
        {personalities?.map((item, i) => (
          <View key={i} style={styles.personalityItem}>
            <Text style={styles.itemText}>{item.type}</Text>
            <Text style={styles.itemCount}>{item.count}</Text>
          </View>
        ))}
      </View>
      {personalities?.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>성격 리뷰가 없어요!</Text>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13,
  },
  personalityItem: {
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
  itemCount: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.grey7,
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

export default MyPersonality;
