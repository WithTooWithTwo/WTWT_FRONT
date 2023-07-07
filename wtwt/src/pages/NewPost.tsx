import React, {useCallback, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ListStackParamList} from './List';

type NewPostScreenProps = NativeStackScreenProps<ListStackParamList, 'NewPost'>;

function NewPost({navigation}: NewPostScreenProps) {
  const [country, setCountry] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [firstDay, setFirstDay] = useState(new Date());
  const [lastDay, setLastDay] = useState(new Date());
  const [category, setCategory] = useState('');
  const [headCount, setHeadCount] = useState('');

  const [loading, setLoading] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleFirstConfirm = (date: Date) => {
    // console.warn('A date has been picked: ', date);
    setFirstDay(date);
    hideDatePicker();
  };

  const handleLastConfirm = (date: Date) => {
    // console.warn('A date has been picked: ', date);
    setLastDay(date);
    hideDatePicker();
  };

  const onChangeTitle = useCallback((text: string) => {
    setTitle(text);
  }, []);
  const onChangeCountry = useCallback((text: string) => {
    setCategory(text);
  }, []);
  const onChangeContent = useCallback((text: string) => {
    setContent(text);
  }, []);
  const onChangeFirstDay = useCallback((text: Date) => {
    setFirstDay(text);
  }, []);
  const onChangeLastDay = useCallback((text: Date) => {
    setLastDay(text);
  }, []);

  const onChangeHeadCount = useCallback((text: string) => {
    setHeadCount(text);
  }, []);

  const onSubmit = useCallback(async () => {
    console.log(loading, country, title, content, firstDay, lastDay, headCount);

    try {
      setLoading(true);
      console.log(Config.API_URL);
      const response = await axios.post(
        `${Config.API_URL}`,
        {
          country,
          title,
          content,
          firstDay,
          lastDay,
          headCount,
        },
        //{headers : {}}
      );
      console.log(response);
      Alert.alert('알림', '등록 되었습니다!');
      //navigation.navigate('List');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error();
      if (errorResponse) {
        Alert.alert('알림', (errorResponse.data as any).data.massage);
      }
    } finally {
      setLoading(false);
      navigation.navigate('ListBoard');
    }
  }, [loading, country, title, content, firstDay, lastDay, headCount]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerZone}>
            <Pressable style={styles.postButton} onPress={onSubmit}>
              <Text>작성하기</Text>
            </Pressable>
          </View>
          <View style={styles.writingZone}>
            <View style={styles.countryCategory}>
              <RNPickerSelect
                placeholder={{label: '나라선택', value: 0}}
                onValueChange={onChangeCountry}
                fixAndroidTouchableBug={true}
                useNativeAndroidPickerStyle={false}
                items={[
                  {label: '프랑스', value: 1},
                  {label: '영국', value: 2},
                  {label: '스페인', value: 3},
                  {label: '이탈리아', value: 4},
                  {label: '독일', value: 5},
                ]}
              />
            </View>
            <TextInput
              value={title}
              style={styles.titleBox}
              placeholder="제목을 작성해주세요"
              onChangeText={onChangeTitle}
              blurOnSubmit={false}
              clearButtonMode="while-editing"
            />
            <View style={styles.contentBlock}>
              <TextInput
                value={content}
                style={styles.contentBox}
                placeholder="내용을 작성해주세요"
                multiline={true}
                onChangeText={onChangeContent}
                blurOnSubmit={false}
                clearButtonMode="while-editing"
              />
            </View>
            <View style={styles.infoZone}>
              <Text style={styles.infoTitleText}>동행 정보</Text>
              <View style={styles.date}>
                <Pressable style={styles.dateBox} onPress={showDatePicker}>
                  <Text>시작 날짜</Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleFirstConfirm}
                  onCancel={hideDatePicker}
                />
                <Pressable style={styles.dateBox} onPress={showDatePicker}>
                  <Text>종료 날짜</Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleLastConfirm}
                  onCancel={hideDatePicker}
                />
                <View style={[styles.dateBox, {width: 60, paddingLeft: 25}]}>
                  <RNPickerSelect
                    placeholder={{label: '인원 선택', value: 0}}
                    onValueChange={onChangeHeadCount}
                    fixAndroidTouchableBug={true}
                    useNativeAndroidPickerStyle={false}
                    items={[
                      {label: '1', value: 1},
                      {label: '2', value: 2},
                      {label: '3', value: 3},
                      {label: '4', value: 4},
                      {label: '5', value: 5},
                      {label: '6', value: 6},
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerZone: {
    height: 60,
    backgroundColor: '#D9D9D980',
    justifyContent: 'center',
    paddingRight: 30,
    alignItems: 'flex-end',
  },
  postButton: {},
  writingZone: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  countryCategory: {
    width: 90,
    padding: 10,
    backgroundColor: '#D9D9D960',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 7,
    paddingLeft: 20,
  },
  countryCategoryText: {
    textAlign: 'center',
  },
  titleBox: {
    marginTop: 10,
    backgroundColor: '#D9D9D960',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 13,
  },
  contentBlock: {
    marginTop: 10,
    height: 350,
    backgroundColor: '#D9D9D960',
    borderRadius: 13,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentBox: {
    flexShrink: 1,
  },
  infoZone: {
    marginTop: 20,
  },
  infoTitleText: {
    fontSize: 16,
  },
  date: {
    marginTop: 20,
    flexDirection: 'row',
  },
  dateBox: {
    width: 120,
    padding: 15,
    marginRight: 10,
    backgroundColor: '#D9D9D960',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  numPeople: {},
});

export default NewPost;
