import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GroupDetailStackParamList} from './GroupDetailScreen';
import {RouteProp} from '@react-navigation/native';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {Colors} from '../../constants/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useState} from 'react';
import MemberItem from '../../components/Member/MemberItem';
import {fetchGroup, GroupType, storeMemo, storeNotice} from '../../util/group';

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
  // const groups = useSelector((state: RootState) => state.group).groups;
  // const selectedGroup = groups.find(group => group.id.toString() == id)!;
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);
  const [newNotice, setNewNotice] = useState<string>('');
  const [newMemo, setNewMemo] = useState<string>('');
  const groupReviewPressHandler = () => {
    navigation.navigate('GroupReview', {groupId: id});
  };

  useEffect(() => {
    async function getGroup() {
      try {
        const group = await fetchGroup(id);
        setSelectedGroup(group);
      } catch (error) {
        //setError('Could not fetch expense!');
      }
    }
    getGroup();
  }, [id]);

  if (!selectedGroup) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          {/* 로딩 상태에 대한 UI */}
          <Text>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  const changeNoticeHandler = (text: string) => {
    setNewNotice(text);
  };

  const changeMemoHandler = (text: string) => {
    setNewMemo(text);
  };

  const submitNoticeHandler = async () => {
    try {
      const response = await storeNotice(id, newNotice);
      fetchGroup(response.result).then(res => {
        setSelectedGroup(res);
      });
    } catch (e) {
      console.log(e);
    }
    setNewNotice('');
  };

  const submitMemoHandler = async () => {
    try {
      const response = await storeMemo(id, newMemo);
      fetchGroup(response.result).then(res => {
        setSelectedGroup(res);
      });
    } catch (e) {
      console.log(e);
    }
    setNewMemo('');
  };

  return (
    <View>
      <SafeAreaView style={{backgroundColor: Colors.grey1}}>
        <ScreenHeader title="그룹" color={Colors.grey1} isGoBack={true} />
        <ScrollView>
          <Image
            source={
              selectedGroup.image
                ? {uri: selectedGroup.image}
                : require('../../assets/group_main.png')
            }
            resizeMode="cover"
            style={styles.image}
          />

          <View style={styles.mainBox}>
            <Pressable
              style={styles.reviewButton}
              onPress={groupReviewPressHandler}>
              <Text>리뷰 남기기</Text>
            </Pressable>
            <View style={styles.dDayBox}>
              <Text style={styles.dDay}>
                D{' '}
                {selectedGroup.dday < 0
                  ? `+ ${selectedGroup.dday * -1}`
                  : `- ${selectedGroup.dday}`}
              </Text>
            </View>
            <Text style={styles.title}>{selectedGroup.name}</Text>
            <View style={styles.dateBox}>
              <Text style={styles.date}>{selectedGroup.firstDay}</Text>
              <FontAwesome name="user-alt" color="#3C70FF99" size={12} />
              <Text style={styles.headCount}>
                {selectedGroup.members.length
                  ? selectedGroup.members.length + 1
                  : 1}
                명
              </Text>
            </View>
            <View style={styles.keywordBox}>
              <Text style={styles.keyword}></Text>
              <Text style={styles.keyword}></Text>
            </View>
            <View style={styles.memberBox}>
              <MemberItem
                groupId={selectedGroup.id}
                leader={selectedGroup.leader.nickname}
                members={selectedGroup.members}
              />
            </View>

            <View style={styles.noticeBox}>
              <Text style={styles.noticeTitle}>NOTICE</Text>
              <View style={styles.noticeList}>
                {selectedGroup!.notices.map(el => (
                  <Text key={el.id} style={styles.noticeItem}>
                    {el.data}
                  </Text>
                ))}
                <TextInput
                  value={newNotice}
                  placeholder="더 추가하기"
                  onChangeText={changeNoticeHandler}
                  onBlur={submitNoticeHandler}
                  blurOnSubmit={true}
                  clearButtonMode="while-editing"
                />
              </View>
            </View>
          </View>
          <View style={styles.placeBox}>
            <View style={styles.placeTitle}>
              <Text style={styles.placeTitleText}>꼭 들릴 맛집</Text>
            </View>
            <ScrollView horizontal={true} style={styles.placeContent}>
              {selectedGroup.places.map(el => (
                <View key={el.id} style={styles.placeItem}>
                  <Image
                    style={styles.placeImage}
                    source={require('../../assets/place1.png')}
                  />
                  <Text style={styles.placeText}>{el.name}</Text>
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
                <Text key={el.id} style={styles.memoItem}>
                  {el.data}
                </Text>
              ))}
              <TextInput
                value={newMemo}
                placeholder="더 추가하기"
                onChangeText={changeMemoHandler}
                onBlur={submitMemoHandler}
                blurOnSubmit={true}
                clearButtonMode="while-editing"
              />
            </View>
            <View style={{paddingBottom: 50}} />
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
  noticeInput: {
    backgroundColor: 'white',
    borderRadius: 5,
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
    marginBottom: 7,
  },
  reviewButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default GroupMainScreen;
