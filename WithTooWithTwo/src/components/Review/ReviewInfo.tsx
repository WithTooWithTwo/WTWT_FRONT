import {GroupType} from '../../util/group';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';

const ReviewInfo = ({group}: {group: GroupType}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBlock}>
        <Image source={require('../../assets/place1.png')} resizeMode="cover" />
      </View>
      <View style={styles.contentBlock}>
        <View style={styles.travelBlock}>
          <Text style={styles.travelText}>함께한 여행</Text>
        </View>
        <Text style={styles.titleText}>{group.name}</Text>
        <Text style={styles.dateText}>
          {group.firstDay} - {group.lastDay}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 92,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: Colors.grey1,
  },
  imageBlock: {
    width: 60,
    height: 60,
    overflow: 'hidden',
  },
  contentBlock: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  travelBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 8,
    padding: 3,
    marginBottom: 2,
    backgroundColor: Colors.sub2,
  },
  travelText: {
    fontSize: 12,
  },
  titleText: {
    fontSize: 15,
    padding: 2,
  },
  dateText: {
    padding: 2,
    fontSize: 13,
  },
});

export default ReviewInfo;
