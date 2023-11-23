import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import {Colors} from '../../constants/styles';
import {OnePostType} from '../../util/post';
import MemberList from '../Member/MemberList';

function PostInfo({postData}: {postData: OnePostType}) {
  const changeGenderToKorean = (gender: string) => {
    if (gender === 'FEMALE') return '여성';
    if (gender === 'MALE') return '남성';
    if (gender === 'NONE' || gender === null) return '상관없음';
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
            <Text style={styles.itemText}>{postData.firstDay}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>{postData.lastDay}</Text>
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
          {postData?.tags?.length ? (
            postData.tags.slice(0, 3).map(tag => (
              <View key={tag} style={styles.item}>
                <Text style={styles.itemText}>{tag}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyString}>선호 지역이 없어요 :)</Text>
          )}
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
          {postData.members.length ? (
            <MemberList members={postData.members} />
          ) : (
            <Text style={styles.emptyString}>
              아직 함께하는 사람들이 없어요 :)
            </Text>
          )}
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
              {changeGenderToKorean(postData.preference.gender!)}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {postData.preference.minAge} - {postData.preference.maxAge}대
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
  emptyString: {
    fontSize: 11,
    color: Colors.grey4,
  },
});
export default PostInfo;
