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
import LeaderMemberItem from '../../components/Member/LeaderMemberItem';
import {fetchGroup, GroupType, storeMemo, storeNotice} from '../../util/group';
import GroupNotice from '../../components/Group/GroupNotice';
import GroupMemo from '../../components/Group/GroupMemo';
import GroupPlace from '../../components/Group/GroupPlace';

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
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);

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
              <LeaderMemberItem
                groupId={selectedGroup.id}
                leader={selectedGroup.leader}
                members={selectedGroup.members}
              />
            </View>
            <GroupNotice
              groupId={id}
              notices={selectedGroup.notices}
              setGroup={setSelectedGroup}
            />
          </View>
          <GroupPlace
            groupId={id}
            places={selectedGroup.places}
            setGroup={setSelectedGroup}
          />
          <GroupMemo
            groupId={id}
            memos={selectedGroup.memos}
            setGroup={setSelectedGroup}
          />
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
