import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Banner from '../../components/UI/Banner';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import PostsSlice, {PostsType, setPosts} from '../../slices/postsSlice';
import PostItem from '../../components/List/PostItem';
import {useEffect, useState} from 'react';
import {fetchPost} from '../../util/post';
import HotItem from '../../components/List/HotItem';

type InitialProps = MaterialTopTabScreenProps<MainTabParamList, 'Initial'>;
function InitialScreen({navigation}: InitialProps) {
  // const [posts, setPosts] = useState(Array<PostsType>);
  const posts = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getPosts() {
      try {
        const posts = await fetchPost();
        dispatch(setPosts(posts));
        // console.log(posts);
      } catch (error) {
        //setError('Could not fetch expense!');
      }
    }
    getPosts();
  }, []);

  const renderPosts = posts.posts.slice(0, 3);
  const renderHots = posts.posts.slice(0, 5);

  return (
    <>
      <ScrollView>
        <Banner />
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.title}>번개 만남</Text>
            {renderPosts.map((post, index) => (
              <PostItem key={index} {...post} />
            ))}
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>실시간 HOT</Text>
            {renderHots.map((post, i) => (
              <HotItem
                key={i}
                id={post.id!}
                title={post.title}
                views={2293}
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
    backgroundColor: '#F8F8F9',
  },
  box: {
    flexDirection: 'column',
    marginBottom: 45,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default InitialScreen;
