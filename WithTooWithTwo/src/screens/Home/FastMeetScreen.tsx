import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {fetchPost} from '../../util/post';
import {PostsType, setPosts} from '../../slices/postsSlice';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import PostOutput from '../../components/List/PostOutput';

type FastMeetProps = MaterialTopTabScreenProps<MainTabParamList, 'FastMeet'>;
function FastMeetScreen() {
  // const [posts, setPosts] = useState(Array<PostsType>);
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
      <SafeAreaView style={{backgroundColor: '#F8F8F9'}}>
        <PostOutput posts={posts.posts} />
      </SafeAreaView>
    </>
  );
}

export default FastMeetScreen;
