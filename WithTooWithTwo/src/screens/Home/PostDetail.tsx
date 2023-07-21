import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import postItem from '../../components/List/PostItem';
import {RouteProp} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import ScreenHeader from '../../components/UI/ScreenHeader';

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
  const posts = useSelector((state: RootState) => state.post);
  const selectedPost = posts.posts.find(post => post.id === selectedPostId)!;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <ScreenHeader title="" color="white" isGoBack={true} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  headerBox: {},
  titleBox: {},
  title: {},
  infoBox: {},
  dateText: {},
  viewsText: {},
  writerBox: {},
  writerImage: {},
  writerText: {},
  contentBox: {},
  contentText: {},
  chatBox: {},
  chatButton: {},
});

export default PostDetail;
