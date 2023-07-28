import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GroupDetailStackParamList} from './GroupDetailScreen';
import {RouteProp} from '@react-navigation/native';

type GroupReviewNavigationProp = NativeStackNavigationProp<
  GroupDetailStackParamList,
  'GroupReview'
>;

type GroupReviewRouteProp = RouteProp<GroupDetailStackParamList, 'GroupReview'>;
type GroupReviewProps = {
  navigation: GroupReviewNavigationProp;
  route: GroupReviewRouteProp;
};

function GroupReviewScreen({navigation, route}: GroupReviewProps) {
  return;
}

export default GroupReviewScreen;
