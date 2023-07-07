import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {fetchPost} from '../../util/post';
import {useDispatch, useSelector} from 'react-redux';
import {addPosts, PostsType, setPosts} from '../../slices/postsSlice';
import PostOutput from '../../components/List/PostOutput';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {RootState} from '../../store/store';

type PostListProps = MaterialTopTabScreenProps<MainTabParamList, 'PostList'>;
function PostListScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post);
  useEffect(() => {
    async function getPosts() {
      setIsFetching(true);
      try {
        const posts = await fetchPost();
        dispatch(setPosts(posts));
        console.log(posts);
      } catch (error) {
        //setError('Could not fetch expense!');
      }
      setIsFetching(false);
    }
    getPosts();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#F8F8F9'}}>
        <PostOutput posts={posts.posts} />
      </SafeAreaView>
    </>
  );
}

export default PostListScreen;
