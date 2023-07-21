import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GroupDetailStackParamList} from './GroupDetailScreen';
import {RouteProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {Colors} from '../../constants/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import MemberItem from '../../components/Member/MemberItem';

type GroupMainNavigationProp = NativeStackNavigationProp<
  GroupDetailStackParamList,
  'GroupMain'
>;

type GroupMainRouteProp = RouteProp<GroupDetailStackParamList, 'GroupMain'>;
type GroupMainProps = {
  navigation: GroupMainNavigationProp;
  route: GroupMainRouteProp;
};
function GroupMainScreen({navigation, route}: GroupMainProps) {
  const id = route.params?.groupId;
  const groups = useSelector((state: RootState) => state.group).groups;
  const selectedGroup = groups.find(group => group.groupId == id)!;
  return (
    <View>
      <SafeAreaView style={{backgroundColor: Colors.grey1}}>
        <ScreenHeader title="그룹" color={Colors.grey1} isGoBack={true} />
        <ScrollView>
          <Image
            source={require('../../assets/group_main.png')}
            resizeMode="cover"
            style={styles.image}
          />
          <View style={styles.mainBox}>
            <View style={styles.dDayBox}>
              <Text style={styles.dDay}>D - {selectedGroup.dday}</Text>
            </View>
            <Text style={styles.title}>{selectedGroup.groupName}</Text>
            <View style={styles.dateBox}>
              <Text style={styles.date}>{selectedGroup.firstDay}</Text>
              <FontAwesome name="user-alt" color="#3C70FF99" size={12} />
              <Text style={styles.headCount}>{selectedGroup.headCounts}명</Text>
            </View>
            <View style={styles.keywordBox}>
              <Text style={styles.keyword}></Text>
              <Text style={styles.keyword}></Text>
            </View>
            <View style={styles.memberBox}>
              <MemberItem
                groupId={selectedGroup.groupId}
                leader={selectedGroup.leader.nickname}
                members={selectedGroup.members}
              />
            </View>
            <View style={styles.noticeBox}>
              <Text style={styles.noticeTitle}>NOTICE</Text>
              <View style={styles.noticeList}>
                {selectedGroup.notice.map((el, i) => (
                  <Text key={i} style={styles.noticeItem}>
                    {el}
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.placeBox}>
            <View style={styles.placeTitle}>
              <Text style={styles.placeTitleText}>꼭 들릴 맛집</Text>
            </View>
            <ScrollView horizontal={true} style={styles.placeContent}>
              {selectedGroup.places.map((el, i) => (
                <View key={i} style={styles.placeItem}>
                  <Image
                    style={styles.placeImage}
                    source={require('../../assets/place1.png')}
                  />
                  <Text style={styles.placeText}>{el}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.placeBox}>
            <View style={styles.placeTitle}>
              <Text style={styles.placeTitleText}>가고싶은 여행지</Text>
            </View>
            <View style={styles.memoContent}>
              {selectedGroup.memos.map((el, i) => (
                <Text key={i} style={styles.memoItem}>
                  {el}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
  },
  mainBox: {
    padding: 30,
    backgroundColor: '#FFF',
  },
  dDayBox: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  dDay: {
    color: Colors.primary500,
    fontWeight: '600',
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  dateBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    fontWeight: '300',
    color: Colors.grey4,
    marginRight: 15,
  },
  headCount: {
    fontSize: 12,
    fontWeight: '300',
    color: Colors.grey4,
    marginLeft: 7,
  },
  keywordBox: {
    flexDirection: 'row',
  },
  keyword: {},
  memberBox: {
    flexDirection: 'row',
  },
  noticeBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey1,
    borderRadius: 5,
  },
  noticeTitle: {
    color: Colors.primary500,
    fontSize: 14,
    marginBottom: 10,
  },
  noticeList: {
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  noticeItem: {
    fontSize: 15,
    marginBottom: 10,
  },

  placeBox: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  placeTitle: {
    backgroundColor: '#FFF',
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 6,
    borderTopRightRadius: 6,
  },
  placeTitleText: {
    color: Colors.primary500,
    fontSize: 14,
    fontWeight: '600',
  },
  placeContent: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopEndRadius: 6,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
  },
  placeItem: {
    marginRight: 13,
  },
  placeImage: {
    width: 140,
    height: 80,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  placeText: {
    fontSize: 13,
    fontWeight: '400',
  },
  memoContent: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 100,
    borderTopEndRadius: 6,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
  },
  memoItem: {
    fontSize: 15,
    fontWeight: '400',
  },
});

export default GroupMainScreen;
