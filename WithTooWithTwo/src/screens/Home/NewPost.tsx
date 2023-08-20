import React, {useCallback, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import axios, {AxiosError} from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {useDispatch} from 'react-redux';
import {storePosts} from '../../util/post';
import {RadioButton} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {getFormattedDate} from '../../util/date';
import ImagesPicker from '../../components/Image/ImagesPicker';
import {Colors} from '../../constants/styles';
import RenderImages from '../../components/Image/RenderImages';

type NewPostScreenProps = NativeStackScreenProps<HomeStackParamList, 'NewPost'>;

function NewPost({navigation}: NewPostScreenProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [firstDay, setFirstDay] = useState(new Date());
  const [lastDay, setLastDay] = useState(new Date());
  const [category, setCategory] = useState('');
  const [headCount, setHeadCount] = useState('1');
  const [loading, setLoading] = useState(false);
  const [preferGender, setPreferGender] = useState('FEMALE');
  const [range, setRange] = useState([10, 20]);
  const [image, setImage] = useState<any>([]);

  const [thunder, setThunder] = useState(false);
  const dispatch = useDispatch();

  const [isFirstDatePickerVisible, setFirstDatePickerVisibility] =
    useState(false);
  const [isLastDatePickerVisible, setLastDatePickerVisibility] =
    useState(false);
  const showFirstDatePicker = () => {
    setFirstDatePickerVisibility(true);
  };

  const hideFirstDatePicker = () => {
    setFirstDatePickerVisibility(false);
  };

  const showLastDatePicker = () => {
    setLastDatePickerVisibility(true);
  };

  const hideLastDatePicker = () => {
    setLastDatePickerVisibility(false);
  };

  const handleFirstConfirm = (date: Date) => {
    // console.warn('A date has been picked: ', date);
    setFirstDay(date);
    hideFirstDatePicker();
  };

  const handleLastConfirm = (date: Date) => {
    // console.warn('A date has been picked: ', date);
    setLastDay(date);
    hideLastDatePicker();
  };

  const onChangeTitle = useCallback((text: string) => {
    setTitle(text);
  }, []);
  const onChangeCategory = useCallback((text: string) => {
    setCategory(text);
  }, []);
  const onChangeContent = useCallback((text: string) => {
    setContent(text);
  }, []);

  const onChangeHeadCount = useCallback((text: string) => {
    setHeadCount(text);
  }, []);

  const onChangeThunder = useCallback((value: boolean) => {
    setThunder(value);
  }, []);

  const onChangePreferGender = useCallback((text: string) => {
    setPreferGender(text);
  }, []);

  const onChangeRange = useCallback((value: Array<number>) => {
    setRange(value);
  }, []);

  const plusHeadCount = () => {
    setHeadCount((+headCount + 1).toString());
  };

  const minusHeadCount = () => {
    if (+headCount > 0) {
      setHeadCount((+headCount - 1).toString());
    }
  };

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('category_id', category);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('firstDay', getFormattedDate(firstDay));
      formData.append('lastDay', getFormattedDate(lastDay));
      formData.append('preferHeadCount', +headCount);
      formData.append('lightning', thunder);
      formData.append('members', ['nickname2', 'nickname3', 'nickname4']);
      formData.append('preferGender', preferGender);
      formData.append('preferMinAge', range[0]);
      formData.append('preferMaxAge', range[1]);
      // formData.append('images', image[0]);
      console.log(image);

      if (image) {
        Array.from(image).forEach(img => {
          formData.append('images', img);
        });
      } else {
        formData.append('images', []);
      }

      const response = await storePosts(formData, 'multipart/form-data');
      // dispatch(addPosts({...postsData, id: response.data.id}));

      Alert.alert('알림', '등록 되었습니다!');
      navigation.navigate('Main');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        console.log((errorResponse.data as any).message);
        Alert.alert('알림', (errorResponse.data as any).message);
        return;
      }
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    category,
    title,
    content,
    firstDay,
    lastDay,
    headCount,
    preferGender,
    range,
    image,
  ]);

  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerZone}>
            <Pressable style={styles.postButton} onPress={onSubmit}>
              <Text style={{color: '#3C70FF', fontWeight: '600'}}>
                작성하기
              </Text>
            </Pressable>
          </View>
          <View style={styles.writingZone}>
            <View style={styles.countryCategory}>
              <View style={styles.countryCategoryText}>
                <RNPickerSelect
                  placeholder={{label: '나라선택', value: 0}}
                  onValueChange={onChangeCategory}
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
            </View>
            <View style={styles.radioBox}>
              <RadioButton
                value="FEMALE"
                color="#3C70FF"
                uncheckedColor="#3C70FF"
                status={thunder === true ? 'checked' : 'unchecked'}
                onPress={() => {
                  thunder === true ? setThunder(false) : setThunder(true);
                }}
              />
              <Text style={styles.radioText}>번개만남으로 올리기</Text>
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

            <ScrollView horizontal={true}>
              <View style={styles.imageBox}>
                <View style={styles.imagePicker}>
                  <ImagesPicker onSetImages={setImage} text="이미지 선택" />
                </View>
                <RenderImages images={image} size={100} />
              </View>
            </ScrollView>

            <View style={styles.infoZone}>
              <Text style={styles.infoTitleText}>동행 정보</Text>
              <View style={styles.date}>
                <Pressable style={styles.dateBox} onPress={showFirstDatePicker}>
                  <Text>
                    {firstDay.getFullYear()} - {firstDay.getMonth() + 1} -{' '}
                    {firstDay.getDate()}
                  </Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isFirstDatePickerVisible}
                  mode="date"
                  onConfirm={handleFirstConfirm}
                  onCancel={hideFirstDatePicker}
                />
                <Text>~</Text>
                <Pressable style={styles.dateBox} onPress={showLastDatePicker}>
                  <Text>
                    {lastDay.getFullYear()} - {lastDay.getMonth() + 1} -{' '}
                    {lastDay.getDate()}
                  </Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isLastDatePickerVisible}
                  mode="date"
                  onConfirm={handleLastConfirm}
                  onCancel={hideLastDatePicker}
                />
              </View>
              <View style={styles.headCountBox}>
                <Text style={[styles.headCountLabel, {marginLeft: 7}]}>
                  인원
                </Text>
                <View style={styles.headCountButtons}>
                  <TouchableOpacity onPress={minusHeadCount}>
                    <Text style={styles.headCountButtonText}> -</Text>
                  </TouchableOpacity>
                  <Text>{headCount}</Text>

                  <TouchableOpacity onPress={plusHeadCount}>
                    <Text style={styles.headCountButtonText}> + </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.groupPeople}>
                <Text style={styles.groupPeopleLabel}>그룹 인원 추가하기</Text>
                <FeatherIcon name="plus" color="#3C70FF" size={25} />
              </View>
            </View>
            <View style={styles.infoZone}>
              <Text style={styles.infoTitleText}>동행인 설정</Text>
              <View style={styles.infoBox}>
                <View style={styles.preferBox}>
                  <Text style={styles.preferText}>선호하는 성별</Text>
                  <RadioButton.Group
                    onValueChange={value => onChangePreferGender(value)}
                    value={preferGender}>
                    <View style={styles.preferGenderGroup}>
                      <View style={styles.preferGenderBox}>
                        <RadioButton value="FEMALE" color="#3C70FF" />
                        <Text style={styles.preferGenderLabel}>여자</Text>
                      </View>
                      <View style={styles.preferGenderBox}>
                        <RadioButton value="MALE" color="#3C70FF" />
                        <Text style={styles.preferGenderLabel}>남자</Text>
                      </View>
                      <View style={styles.preferGenderBox}>
                        <RadioButton value="NONE" color="#3C70FF" />
                        <Text style={styles.preferGenderLabel}>상관없음</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={styles.preferBox}>
                  <Text style={styles.preferText}>선호하는 나이대</Text>
                  <View style={styles.preferAgeBox}>
                    <Pressable style={styles.preferAgeButton}>
                      <Text style={styles.preferAgeLabel}>{range[0]}대</Text>
                    </Pressable>
                    <Text
                      style={[styles.preferAgeLabel, {marginHorizontal: 10}]}>
                      ~
                    </Text>
                    <Pressable style={styles.preferAgeButton}>
                      <Text style={styles.preferAgeLabel}>{range[1]}대</Text>
                    </Pressable>
                  </View>
                  <MultiSlider
                    values={range}
                    min={0}
                    max={70}
                    step={10}
                    trackStyle={{height: 5}}
                    onValuesChange={onChangeRange}
                  />
                </View>
              </View>
            </View>
            <Pressable style={styles.submitButton} onPress={onSubmit}>
              <Text style={styles.submitText}>작성하기</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F9',
  },
  headerZone: {
    height: 60,
    backgroundColor: '#D9D9D980',
    justifyContent: 'center',
    paddingRight: 30,
    alignItems: 'flex-end',
  },
  postButton: {},
  writingZone: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  countryCategory: {
    width: 100,
    height: 40,
    padding: 10,
    backgroundColor: '#D9D9D950',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  countryCategoryText: {},
  radio: {
    flexDirection: 'row',
    paddingVertical: 7,
    justifyContent: 'space-between',
  },
  radioBox: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  radioText: {
    paddingTop: 10,
    paddingHorizontal: 7,
    marginLeft: 10,
    marginRight: 5,
    color: '#707070',
  },
  radioButton: {
    color: '#3C70FF',
  },
  titleBox: {
    marginTop: 10,
    backgroundColor: '#D9D9D950',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 13,
  },
  contentBlock: {
    marginTop: 10,
    height: 350,
    backgroundColor: '#D9D9D950',
    borderRadius: 13,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentBox: {
    flexShrink: 1,
  },
  infoZone: {
    marginTop: 40,
  },
  infoTitleText: {
    fontSize: 17,
  },
  infoBox: {
    backgroundColor: '#D9D9D950',
    borderRadius: 7,
    padding: 20,
    marginTop: 20,
  },
  date: {
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBox: {
    width: 140,
    padding: 15,
    marginRight: 0,
    backgroundColor: '#D9D9D950',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  headCountBox: {
    width: 180,
    padding: 15,
    marginBottom: 15,
    borderRadius: 7,
    backgroundColor: '#D9D9D950',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headCountButtons: {
    width: 100,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headCountButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'grey',
  },
  headCountLabel: {
    paddingTop: 2,
    fontSize: 15,
    color: '#8F8F8F',
  },
  groupPeople: {
    padding: 17,
    borderRadius: 7,
    backgroundColor: '#D9D9D950',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupPeopleLabel: {
    marginLeft: 3,
    fontSize: 15,
    color: '#8F8F8F',
  },
  preferBox: {
    marginBottom: 20,
  },
  preferText: {
    fontSize: 15,
    color: '#707070',
  },
  preferGenderGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  preferGenderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferGenderLabel: {
    color: '#979797',
    fontSize: 16,
    marginLeft: 5,
  },
  preferAgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
  preferAgeButton: {
    backgroundColor: 'rgba(248,248,248,0.97)',
    paddingVertical: 14,
    paddingHorizontal: 17,
    borderRadius: 6,
  },
  preferAgeLabel: {
    color: '#979797',
    fontSize: 16,
  },
  submitButton: {
    marginTop: 30,
    flex: 1,
    paddingVertical: 20,
    borderRadius: 6,
    backgroundColor: '#3C70FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 18,
    color: 'white',
  },
  imageBox: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: Colors.grey5,
  },
});

export default NewPost;
