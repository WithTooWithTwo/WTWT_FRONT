import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {View} from 'react-native';

type FastMeetProps = MaterialTopTabScreenProps<MainTabParamList, 'FastMeet'>;
function FastMeetScreen({navigation}: FastMeetProps) {
  return <View />;
}

export default FastMeetScreen;
