import {SafeAreaView, View} from 'react-native';
import ScreenHeader from '../../components/UI/ScreenHeader';

function ChatScreen() {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScreenHeader title="채팅" color="white" isGoBack={false} />
    </SafeAreaView>
  );
}

export default ChatScreen;
