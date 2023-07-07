import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

interface writer {
  id: number;
  nickname: string;
}
interface ListItem {
  writer: writer;
  title: string;
  content: string;
  postDate: Date;
  category: string;
}

interface PrintListProps {
  itemList: ListItem[];
}

function PrintList({itemList}: PrintListProps) {
  const navigation = useNavigation();

  const handleListItemPress = (itemId: number) => {
    navigation.navigate('ListDetail', {itemId: itemId});
  };

  return <View></View>;
}
