import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {AxiosError} from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {useDispatch} from 'react-redux';
import {CategoryType, fetchCategoryList, storePosts} from '../../util/post';
import {RadioButton} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {getFormattedDate} from '../../util/date';
import ImagesPicker from '../../components/Image/ImagesPicker';
import {Colors} from '../../constants/styles';
import RenderImages from '../../components/Image/RenderImages';
import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectMembers from '../../components/Post/SelectMembers';
import {GroupMember} from '../../util/group';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

type NewPostScreenProps = NativeStackScreenProps<HomeStackParamList, 'NewPost'>;

function NewPost({navigation}: NewPostScreenProps) {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [firstDay, setFirstDay] = useState<Date | null>(null);
  const [lastDay, setLastDay] = useState<Date | null>(null);
  const [category, setCategory] = useState('');
  const [headCount, setHeadCount] = useState('1');
  const [loading, setLoading] = useState(false);
  const [preferGender, setPreferGender] = useState('FEMALE');
  const [range, setRange] = useState([10, 20]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [image, setImage] = useState<any>([]);
  const [thunder, setThunder] = useState(false);
  const [members, setMembers] = useState<string[]>([]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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

  const onChangeNewTag = useCallback((value: string) => {
    setNewTag(value);
  }, []);

  const onChangeMembers = useCallback((value: string) => {
    setMembers(prevState => {
      const updated = [...prevState];
      updated.push(value);
      return updated;
    });
  }, []);

  const deleteMembers = useCallback((value: string) => {
    setMembers(prevState => {
      let updated = [...prevState];
      updated = updated.filter(item => item !== value);
      return updated;
    });
  }, []);

  const plusTags = useCallback(() => {
    setTags(prevState => {
      const updated = [...prevState];
      updated.push(newTag);
      return updated;
    });
    setNewTag('');
  }, [newTag]);

  const deleteTags = useCallback((value: string) => {
    setTags(prevState => {
      let updated = [...prevState];
      updated = updated.filter(item => item !== value);
      return updated;
    });
  }, []);

  const plusHeadCount = () => {
    setHeadCount((+headCount + 1).toString());
  };

  const minusHeadCount = () => {
    if (+headCount > 0) {
      setHeadCount((+headCount - 1).toString());
    }
  };

  const goToBack = () => {
    navigation.goBack();
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('category_id', category);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('firstDay', getFormattedDate(firstDay!));
      formData.append('lastDay', getFormattedDate(lastDay!));
      formData.append('preferHeadCount', +headCount);
      formData.append('lightning', thunder);
      formData.append('members', members);
      formData.append('preferGender', preferGender);
      formData.append('preferMinAge', range[0]);
      formData.append('preferMaxAge', range[1]);
      formData.append('tags', tags);

      if (image && image.length > 0) {
        Array.from(image).forEach(img => {
          formData.append('images', img);
        });
      }

      // console.log(formData);
      const response = await storePosts(formData, 'multipart/form-data');
      // dispatch(addPosts({...postsData, id: response.data.id}));

      console.log(response.data);
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

  useEffect(() => {
    fetchCategoryList().then(r => {
      r.shift();
      setCategoryList(r);
    });
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <SafeAreaView style={{backgroundColor: Colors.grey1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerZone}>
              <Pressable onPress={goToBack}>
                <Ionicons
                  name={'chevron-back'}
                  color={Colors.grey4}
                  size={25}
                />
              </Pressable>

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
                    placeholder={{
                      label: '나라 선택',
                      value: 0,
                    }}
                    style={{
                      placeholder: {
                        color: Colors.placeholder,
                      },
                    }}
                    onValueChange={onChangeCategory}
                    fixAndroidTouchableBug={true}
                    useNativeAndroidPickerStyle={false}
                    items={categoryList}
                  />
                  {!category && (
                    <Ionicons
                      name={'chevron-down'}
                      color={Colors.grey4}
                      size={15}
                    />
                  )}
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
                  <ImagesPicker
                    onSetImages={setImage}
                    count={image.length}
                    style={styles.imagePicker}
                  />
                  <RenderImages images={image} size={80} />
                </View>
              </ScrollView>

              <View style={styles.infoZone}>
                <Text style={styles.infoTitleText}>동행 정보</Text>
                <View style={styles.date}>
                  <Pressable
                    style={styles.dateBox}
                    onPress={showFirstDatePicker}>
                    {firstDay == null ? (
                      <Text style={styles.placeholder}>시작 날짜</Text>
                    ) : (
                      <Text
                        style={{color: Colors.primary500, fontWeight: '500'}}>
                        {firstDay.getFullYear()} - {firstDay.getMonth() + 1} -{' '}
                        {firstDay.getDate()}
                      </Text>
                    )}
                  </Pressable>
                  <DateTimePickerModal
                    isVisible={isFirstDatePickerVisible}
                    mode="date"
                    onConfirm={handleFirstConfirm}
                    onCancel={hideFirstDatePicker}
                  />
                  <Text>~</Text>
                  <Pressable
                    style={styles.dateBox}
                    onPress={showLastDatePicker}>
                    {lastDay == null ? (
                      <Text style={styles.placeholder}>종료 날짜</Text>
                    ) : (
                      <Text
                        style={{color: Colors.primary500, fontWeight: '500'}}>
                        {lastDay.getFullYear()} - {lastDay.getMonth() + 1} -{' '}
                        {lastDay.getDate()}
                      </Text>
                    )}
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
                      <FontAwesome5
                        name="chevron-left"
                        color={Colors.grey4}
                        size={14}
                      />
                    </TouchableOpacity>
                    <Text style={{fontWeight: '500'}}>{headCount}</Text>
                    <TouchableOpacity onPress={plusHeadCount}>
                      <FontAwesome5
                        name="chevron-right"
                        color={Colors.grey4}
                        size={14}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Modal
                  animationType={'fade'}
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                  }}>
                  <SelectMembers
                    onClose={closeModal}
                    members={members}
                    addMember={onChangeMembers}
                    deleteMember={deleteMembers}
                  />
                </Modal>
                <Pressable
                  style={styles.groupPeople}
                  onPress={() => setIsModalVisible(!isModalVisible)}>
                  <Text style={styles.groupPeopleLabel}>
                    그룹 인원 추가하기
                  </Text>
                  <View
                    style={{
                      gap: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {members && members.length != 0 && (
                      <Text style={styles.groupPeopleCount}>
                        {members.length}명
                      </Text>
                    )}
                    <FeatherIcon
                      name="plus"
                      color={members.length ? Colors.grey4 : Colors.primary500}
                      size={25}
                    />
                  </View>
                </Pressable>
              </View>
              <View style={styles.infoZone}>
                <Text style={styles.infoTitleText}>지역 설정</Text>
                <View style={styles.tagBox}>
                  <View style={styles.groupPeople}>
                    <TextInput
                      value={newTag}
                      onChangeText={onChangeNewTag}
                      style={styles.groupPeopleLabel}
                      placeholder="선호지역 추가하기"
                      onBlur={plusTags}
                    />
                  </View>
                  <View style={styles.tagListBox}>
                    {tags.map(tag => (
                      <View key={tag} style={styles.tags}>
                        <Text>{tag}</Text>
                        <AntDesign
                          name="close"
                          color={Colors.primary500}
                          onPress={() => deleteTags(tag)}
                        />
                      </View>
                    ))}
                  </View>
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
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey1,
  },
  headerZone: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.textInputGrey,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 20,
  },
  postButton: {},
  writingZone: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  countryCategory: {
    width: 110,
    height: 43,
    padding: 10,
    backgroundColor: Colors.textInputGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  countryCategoryText: {
    flexDirection: 'row',
    gap: 5,
  },
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
    backgroundColor: Colors.textInputGrey,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  contentBlock: {
    marginTop: 10,
    height: 350,
    backgroundColor: Colors.textInputGrey,
    borderRadius: 10,
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
    fontSize: 16,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: Colors.textInputGrey,
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
    backgroundColor: Colors.textInputGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  headCountBox: {
    width: 170,
    padding: 15,
    marginBottom: 15,
    borderRadius: 7,
    backgroundColor: Colors.textInputGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headCountButtons: {
    width: 90,
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
    backgroundColor: Colors.textInputGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupPeopleLabel: {
    marginLeft: 3,
    fontSize: 15,
    color: '#8F8F8F',
  },
  groupPeopleCount: {
    fontSize: 15,
    color: Colors.primary500,
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
    color: Colors.placeholder,
    fontSize: 15,
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
    color: Colors.grey9,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 30,
    flex: 1,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#3C70FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  imageBox: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  imagePicker: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.sub,
  },
  tagBox: {
    marginTop: 20,
  },
  tagListBox: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    padding: 10,
    backgroundColor: Colors.grey1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grey5,
  },
  placeholder: {
    color: Colors.placeholder,
  },
});

export default NewPost;
