import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import React, {useCallback, useEffect, useState} from 'react';
import {CategoryType, fetchCategoryList} from '../../util/post';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {setCategory} from '../../slices/filteringSlice';

function MainHeader() {
  const navigation = useNavigation<any>();
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [categories, setCategories] = useState<number>();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategoryList().then(r => {
      r.shift();
      setCategoryList(r);
    });
  }, []);

  const goToNoticeHandler = () => {
    navigation.navigate('Notice');
  };

  const onChangeCategory = (text: number) => {
    const label = categoryList.find(item => item.value == text)?.label;
    dispatch(setCategory(label));
    setCategories(text);
  };

  return (
    <View style={styles.headerZone}>
      <Pressable>
        <RNPickerSelect
          textInputProps={{underlineColorAndroid: 'transparent'}}
          value={categories}
          placeholder={{label: '전체', value: 1}}
          onValueChange={onChangeCategory}
          fixAndroidTouchableBug={true}
          useNativeAndroidPickerStyle={false}
          items={categoryList}
          style={{
            // 스타일은 아래 3가지로 나누어 적용한다
            placeholder: styles.headerText,
            inputAndroid: styles.headerText,
            inputIOS: styles.headerText,
          }}
        />
      </Pressable>
      <Icon name="bell" size={25} color="#868B94" onPress={goToNoticeHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {},
  container: {},
  headerZone: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: 'black',
  },
});

export default MainHeader;
