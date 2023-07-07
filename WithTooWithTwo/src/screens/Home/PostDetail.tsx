import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import postItem from '../../components/List/PostItem';
import {RouteProp} from '@react-navigation/native';

type PostDetailScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PostDetail'
>;
type PostDetailScreenRouteProp = RouteProp<HomeStackParamList, 'PostDetail'>;

type PostDetailScreenProps = {
  navigation: PostDetailScreenNavigationProp;
  route: PostDetailScreenRouteProp;
};

function PostDetail({navigation, route}: PostDetailScreenProps) {
  const selectedPostId = route.params?.postId;
}

export default PostDetail;