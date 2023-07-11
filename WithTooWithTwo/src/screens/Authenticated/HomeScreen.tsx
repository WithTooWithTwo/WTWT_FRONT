import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthenticatedTabParamList} from '../../../App';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainScreen from '../Home/MainScreen';
import NewPost from '../Home/NewPost';
import PostItem from '../../components/List/PostItem';
import PostDetail from '../Home/PostDetail';
import NoticeScreen from '../Notice/NoticeScreen';

export type HomeStackParamList = {
  Main: undefined;
  NewPost: undefined;
  PostDetail: {postId: string};
  Notice: undefined;
};
type HomeStackScreenProps = BottomTabScreenProps<
  AuthenticatedTabParamList,
  'Home'
>;
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeScreen({navigation}: HomeStackScreenProps) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="NewPost"
        component={NewPost}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Notice"
        component={NoticeScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;
