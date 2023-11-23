import {GroupType} from '../../util/group';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';

const ReviewInfo = ({group}: {group: GroupType}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBlock}>
        {group.image ? (
          <Image
            source={{uri: group.image}}
            resizeMode="cover"
            style={{width: 60, height: 60}}
          />
        ) : (
          <Image
            source={require('../../assets/group_main.png')}
            resizeMode="cover"
            style={{width: 60, height: 60}}
          />
        )}
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
    backgroundColor: Colors.grey1,
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
    fontSize: 14,
    padding: 2,
  },
  dateText: {
    padding: 2,
    fontSize: 12,
  },
});

export default ReviewInfo;
