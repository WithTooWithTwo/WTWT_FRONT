import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {fetchPostList} from '../../util/post';
import {useDispatch, useSelector} from 'react-redux';
import {
  addPosts,
  PostsType,
  setNormalPosts,
  setPosts,
} from '../../slices/postsSlice';
import PostOutput from '../../components/List/PostOutput';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {RootState} from '../../store/store';

type PostListProps = MaterialTopTabScreenProps<MainTabParamList, 'PostList'>;
function PostListScreen() {
  //const [posts, setPosts] = useState(Array<PostsType>);
  const [isFetching, setIsFetching] = useState(true);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  useEffect(() => {
    async function getPosts() {
      try {
        setIsFetching(true);
        const posts = await fetchPostList();
        dispatch(setPosts(posts));
        // console.log(posts);
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
      <SafeAreaView style={{backgroundColor: '#F8F8F9', paddingBottom: 30}}>
        <PostOutput posts={posts} />
      </SafeAreaView>
    </>
  );
}

export default PostListScreen;
