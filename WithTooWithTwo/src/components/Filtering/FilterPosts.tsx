import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '../../constants/styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getFormattedDate} from '../../util/date';
import RNPickerSelect from 'react-native-picker-select';
import {setCategory} from '../../slices/filteringSlice';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FilteringType} from '../../util/post';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const FilterPosts = ({
  filtering,
  setDate,
  setOrder,
  setMaxHeadCount,
}: {
  filtering: FilteringType;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setMaxHeadCount: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [minHeadCount, setMinHeadCount] = useState<number>(0);
  const [selectedMaxHeadCount, setSelectedMaxHeadCount] = useState<
    number | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const category = useSelector((state: RootState) => state.filtering.category);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    filtering.order && setSelectedOrder(filtering.order);
    filtering.date && setSelectedDate(filtering.date);
    filtering.maxHeadCount && setSelectedMaxHeadCount(filtering.maxHeadCount);
  }, []);

  const numbers = [
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8},
    {label: '9', value: 9},
    {label: '10', value: 10},
  ];
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(getFormattedDate(date));
    setDate(getFormattedDate(date));
    hideDatePicker();
  };

  const onChangeMinHeadCount = useCallback((text: number) => {
    setMinHeadCount(text);
  }, []);

  const onChangeMaxHeadCount = useCallback((text: number) => {
    setSelectedMaxHeadCount(text);
    setMaxHeadCount(text);
  }, []);

  const onChangeOrder = useCallback((text: string) => {
    setSelectedOrder(text);
    setOrder(text);
  }, []);

  const setDefaultDate = () => {
    setSelectedDate('');
    setDate('');
  };
  const setDefaultHeadCount = () => {
    setSelectedMaxHeadCount(null);
    setMaxHeadCount(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterBox}>
        <View>
          <Pressable
            style={[
              styles.headCount,
              selectedMaxHeadCount ? styles.pressed : null,
            ]}
            onLongPress={setDefaultHeadCount}>
            <RNPickerSelect
              textInputProps={{underlineColorAndroid: 'transparent'}}
              value={selectedMaxHeadCount}
              placeholder={{label: '인원수', value: 0}}
              onValueChange={onChangeMaxHeadCount}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              items={numbers}
              style={{
                // 스타일은 아래 3가지로 나누어 적용한다
                placeholder: styles.headCountDefaultText,
                inputAndroid: styles.headCountText,
                inputIOS: styles.headCountText,
              }}
            />
          </Pressable>
        </View>

        <Pressable
          onLongPress={setDefaultDate}
          style={[styles.date, selectedDate ? styles.pressed : null]}
          onPress={showDatePicker}>
          <Text style={styles.dateText}>
            {selectedDate ? selectedDate : '날짜'}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        {/*<View style={styles.orderBox}>*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      flexDirection: 'row',*/}
        {/*      alignItems: 'center',*/}
        {/*      justifyContent: 'center',*/}
        {/*    }}>*/}
        {/*    <RNPickerSelect*/}
        {/*      textInputProps={{underlineColorAndroid: 'transparent'}}*/}
        {/*      value={maxHeadCount}*/}
        {/*      placeholder={{label: '최신순', value: 'RECENT'}}*/}
        {/*      onValueChange={onChangeOrder}*/}
        {/*      fixAndroidTouchableBug={true}*/}
        {/*      useNativeAndroidPickerStyle={false}*/}
        {/*      items={[{label: '인기순', value: 'POPULAR'}]}*/}
        {/*      style={{*/}
        {/*        // 스타일은 아래 3가지로 나누어 적용한다*/}
        {/*        placeholder: styles.orderText,*/}
        {/*        inputAndroid: styles.orderText,*/}
        {/*        inputIOS: styles.orderText,*/}
        {/*      }}*/}
        {/*    />*/}
        {/*    <FontAwesome5 name="chevron-down" size={11} color={Colors.grey4} />*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
      <View style={styles.orderBox}>
        <RNPickerSelect
          textInputProps={{underlineColorAndroid: 'transparent'}}
          value={selectedOrder}
          placeholder={{label: '최신순', value: 'RECENT'}}
          onValueChange={onChangeOrder}
          fixAndroidTouchableBug={true}
          useNativeAndroidPickerStyle={false}
          items={[{label: '인기순', value: 'POPULAR'}]}
          style={{
            // 스타일은 아래 3가지로 나누어 적용한다
            placeholder: styles.orderText,
            inputAndroid: styles.orderText,
            inputIOS: styles.orderText,
          }}
        />
        <FontAwesome5 name="chevron-down" size={11} color={Colors.grey4} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  filterBox: {
    flex: 2,
    flexDirection: 'row',
    gap: 5,
  },
  headCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'white',
  },
  headCountDefaultText: {
    display: 'flex',
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    color: 'black',
  },
  headCountText: {
    display: 'flex',
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    color: 'black',
    paddingLeft: 11,
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    maxWidth: 100,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,

    borderWidth: 1,
    borderColor: 'white',
  },
  dateText: {
    fontSize: 12,
  },
  orderBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginRight: 5,
  },
  orderText: {
    color: Colors.grey4,
    fontSize: 12,
  },
  pressed: {
    borderColor: Colors.primary500,
  },
  placeHolder: {
    display: 'none',
  },
});
export default FilterPosts;
