import {SafeAreaView, View} from 'react-native';
import ScreenHeader from '../../components/UI/ScreenHeader';

function ChatScreen() {
  return (
    <SafeAreaView>
      <ScreenHeader title="채팅" color="#D9D9D930" isGoBack={false} />
    </SafeAreaView>
  );
}

export default ChatScreen;
