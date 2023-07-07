import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {View} from 'react-native';

type InitialProps = MaterialTopTabScreenProps<MainTabParamList, 'Initial'>;
function InitialScreen({navigation}: InitialProps) {
  return <View />;
}

export default InitialScreen;
