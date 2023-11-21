import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Banner from '../../components/UI/Banner';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import PostsSlice, {
  PostsType,
  setLightningPosts,
  setPopularPosts,
  setPosts,
} from '../../slices/postsSlice';
import PostItem from '../../components/Post/PostItem';
import {useEffect, useState} from 'react';
import {
  fetchPopularPostList,
  fetchPostList,
  PostListType,
} from '../../util/post';
import HotItem from '../../components/Post/HotItem';
import MainHeader from '../../components/UI/MainHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants/styles';

type InitialProps = MaterialTopTabScreenProps<MainTabParamList, 'Initial'>;
function InitialScreen({navigation}: InitialProps) {
  const posts = useSelector((state: RootState) => state.post.posts);
  const popularPosts = useSelector(
    (state: RootState) => state.post.popularPosts,
  );
  const lightningPosts = useSelector(
    (state: RootState) => state.post.lightningPosts,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPosts() {
      try {
        const posts = await fetchPostList();
        dispatch(setPosts(posts));
        const popularPosts = await fetchPopularPostList();
        dispatch(setPopularPosts(popularPosts));
        const lightningPosts = await fetchPostList('?lightning=true');
        dispatch(setLightningPosts(lightningPosts));
      } catch (error: any) {
        return new Error(error);
      }
    }
    getPosts();
  }, []);

  const renderPosts = posts.slice(0, 3);
  const renderLightning = lightningPosts.slice(0, 3);

  return (
    <>
      <ScrollView>
        <Banner />
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>번개 만남</Text>
              <Ionicons
                name={'chevron-forward'}
                color={Colors.primary500}
                size={20}
              />
            </View>

            {renderLightning.map((post, index) => (
              <PostItem key={index} {...post} />
            ))}
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>실시간 HOT</Text>
            {popularPosts!.map((post, i) => (
              <HotItem
                key={i}
                id={post.id.toString()!}
                title={post.title}
                views={post.hits}
                order={i}
              />
            ))}
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>게시판</Text>
            {renderPosts.map((post, index) => (
              <PostItem key={index} {...post} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.grey1,
  },
  box: {
    flexDirection: 'column',
    marginBottom: 45,
  },
  titleBox: {
    flexDirection: 'row',
    gap: 7,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default InitialScreen;
