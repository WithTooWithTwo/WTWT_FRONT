import React, {useCallback} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {ListStackParamList} from './List';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

type ListBoardScreenProps = NativeStackScreenProps<
  ListStackParamList,
  'ListBoard'
>;
function ListBoard({navigation}: ListBoardScreenProps) {
  const toNewPost = useCallback(() => {
    navigation.navigate('NewPost');
  }, [navigation]);
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.categoryZone}>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.categoryBox}>정렬순</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.categoryBox}>인원수</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.categoryBox}>날짜</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.postZone}>
              <View style={styles.postBlock}>
                <View style={styles.infoBox}>
                  <Text style={styles.userText}>닉네임</Text>
                  <Text style={styles.dateText}>1시간 전</Text>
                </View>
                <Text style={styles.titleText}>
                  독일에서 파리로 함께 여행 가실 분!
                </Text>
                <Text style={styles.innerText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et..
                </Text>
                <View style={styles.footerBox}>
                  <Text style={styles.stateText}>모집 중</Text>
                  <Text style={styles.commentText}>1/6</Text>
                  <Text style={styles.likeText}>6</Text>
                </View>
              </View>
              <View style={styles.postBlock}>
                <View style={styles.infoBox}>
                  <Text style={styles.userText}>닉네임</Text>
                  <Text style={styles.dateText}>1시간 전</Text>
                </View>
                <Text style={styles.titleText}>
                  독일에서 파리로 함께 여행 가실 분!
                </Text>
                <Text style={styles.innerText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et..
                </Text>
                <View style={styles.footerBox}>
                  <Text style={styles.stateText}>모집 중</Text>
                  <Text style={styles.commentText}>1/6</Text>
                  <Text style={styles.likeText}>6</Text>
                </View>
              </View>
              <View style={styles.postBlock}>
                <View style={styles.infoBox}>
                  <Text style={styles.userText}>닉네임</Text>
                  <Text style={styles.dateText}>1시간 전</Text>
                </View>
                <Text style={styles.titleText}>
                  독일에서 파리로 함께 여행 가실 분!
                </Text>
                <Text style={styles.innerText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et..
                </Text>
                <View style={styles.footerBox}>
                  <Text style={styles.stateText}>모집 중</Text>
                  <Text style={styles.commentText}>1/6</Text>
                  <Text style={styles.likeText}>6</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/*<View style={styles.absoluteView}>*/}
      {/*  <Pressable onPress={toNewPost}>*/}
      {/*    <Icon name="pencil" size={30} color="white" />*/}
      {/*  </Pressable>*/}
      {/*</View>*/}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerZone: {
    height: 60,
    backgroundColor: '#D9D9D980',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
  categoryZone: {
    height: 60,
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  categoryBox: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 10,
    fontSize: 14,
    backgroundColor: '#D9D9D980',
  },
  postZone: {
    marginHorizontal: 25,
    marginTop: 13,
  },
  postBlock: {
    backgroundColor: '#D9D9D980',
    padding: 20,
    marginBottom: 15,
  },
  infoBox: {
    flexDirection: 'row',
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  userText: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 10,
  },
  titleText: {
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  innerText: {
    paddingBottom: 13,
    color: '#B1B1B1',
    fontSize: 12,
  },
  footerBox: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#C9C9C9',
    paddingTop: 12,
  },
  stateText: {
    flex: 13,
  },
  commentText: {
    flex: 1,
    paddingRight: 10,
  },
  likeText: {
    flex: 1,
  },
  absoluteView: {
    backgroundColor: '#c9c9c9',
    position: 'absolute',
    right: 30,
    bottom: 30,
    padding: 15,
    borderRadius: 50,
  },
});

export default ListBoard;
