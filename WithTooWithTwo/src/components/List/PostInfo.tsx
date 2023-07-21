import {PostsType} from '../../slices/postsSlice';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import MemberItem from '../Member/MemberItem';
import {getFormattedDate} from '../../util/date';
import {Colors} from '../../constants/styles';

function PostInfo({postData}: {postData: PostsType}) {
  console.log(postData.preferGender);
  const changeGenderToKorean = (gender: string) => {
    if (gender === 'FEMALE') return '여성';
    if (gender === 'MALE') return '남성';
    if (gender === 'NOMATTER') return '상관없음';
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataBox}>
        <View style={styles.labelBox}>
          <FontAwesome5
            name="clock"
            size={18}
            style={styles.icon}
            color={Colors.primary500}
          />
          <Text style={styles.label}>여행 날짜</Text>
        </View>
        <View style={styles.itemBox}>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {getFormattedDate(new Date(postData.firstDay))}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {getFormattedDate(new Date(postData.lastDay))}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.dataBox}>
        <View style={styles.labelBox}>
          <Octicons
            name="location"
            size={20}
            style={[styles.icon, {paddingBottom: 1}]}
            color={Colors.primary500}
          />
          <Text style={styles.label}>선호 지역</Text>
        </View>
        <View style={styles.itemBox}>
          <View style={styles.item}>
            <Text style={styles.itemText}>독일</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>파리</Text>
          </View>
        </View>
      </View>
      <View style={styles.dataBox}>
        <View style={styles.labelBox}>
          <FontAwesome5
            name="user-alt"
            size={16}
            style={styles.icon}
            color={Colors.primary500}
          />
          <Text style={styles.label}>사람들</Text>
        </View>
        <View style={styles.itemBox}>
          <View style={styles.item}>
            <Text style={styles.itemText}>테스트 중</Text>
            {/*<MemberItem*/}
            {/*  leader={postData.writer_id}*/}
            {/*  members={postData.companions}*/}
            {/*/>*/}
          </View>
        </View>
      </View>
      <View style={styles.dataBox}>
        <View style={styles.labelBox}>
          <FontAwesome
            name="heart"
            size={16}
            style={styles.icon}
            color={Colors.primary500}
          />
          <Text style={styles.label}>선호 동행인</Text>
        </View>
        <View style={styles.itemBox}>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {changeGenderToKorean(postData.preferGender)}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {postData.preferMinAge}대 - {postData.preferMaxAge}대
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F9',
    height: 180,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  dataBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelBox: {
    width: 110,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    marginLeft: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A0A4AB',
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.sub2,
    borderRadius: 4,
    marginRight: 10,
  },
  itemText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
export default PostInfo;
