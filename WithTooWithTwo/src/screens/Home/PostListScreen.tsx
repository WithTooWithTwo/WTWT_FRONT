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

type PostListProps = MaterialTopTabScreenProps<MainTabParamList, 'PostList'>;
function PostListScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<PostsType[]>();
  useEffect(() => {
    async function getPosts() {
      setIsFetching(true);
      try {
        const posts = await fetchPost();
        setPosts(posts);
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
      <SafeAreaView>
        <PostOutput posts={posts!} />
      </SafeAreaView>
    </>
  );
}

export default PostListScreen;
