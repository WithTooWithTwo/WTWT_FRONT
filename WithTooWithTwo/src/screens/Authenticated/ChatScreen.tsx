import {SafeAreaView, View} from 'react-native';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AuthenticatedTabParamList} from '../../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatListScreen from '../Chat/ChatListScreen';
import ChatRoomScreen from '../Chat/ChatRoomScreen';
import {GroupMember} from '../../util/group';
import UserPageScreen from '../MyPage/UserPageScreen';

type ChatStackScreenProps = BottomTabScreenProps<
  AuthenticatedTabParamList,
  'Chat'
>;

export type ChatStackParamList = {
  ChatList: undefined;
  ChatRoom: {roomId: string; userId: string; opponent: GroupMember};
  UserPage: {userId: string};
};

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

function ChatScreen() {
  return (
    <>
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="ChatList"
          component={ChatListScreen}
          options={{headerShown: false}}
        />
        <ChatStack.Screen
          name="ChatRoom"
          component={ChatRoomScreen}
          options={{headerShown: false}}
        />
        <ChatStack.Screen
          name="UserPage"
          component={UserPageScreen}
          options={{headerShown: false}}
        />
      </ChatStack.Navigator>
    </>
  );
}

export default ChatScreen;
