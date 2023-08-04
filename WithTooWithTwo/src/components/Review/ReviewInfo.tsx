import {GroupType} from '../../util/group';
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/styles';

const ReviewInfo = ({group}: {group: GroupType}) => {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 92,
    padding: 14,
    backgroundColor: Colors.grey1,
  },
  imageBlock: {
    width: 60,
    height: 60,
  },
  contentBlock: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  titleBlock: {},
  titleText: {},
});

export default ReviewInfo;
