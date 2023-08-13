import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {fetchPostList} from '../../util/post';
import {PostsType, setLightningPosts, setPosts} from '../../slices/postsSlice';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import PostOutput from '../../components/List/PostOutput';

type FastMeetProps = MaterialTopTabScreenProps<MainTabParamList, 'FastMeet'>;
function FastMeetScreen() {
  // const [posts, setPosts] = useState(Array<PostsType>);
  const [isFetching, setIsFetching] = useState(true);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.lightningPosts);
  useEffect(() => {
    async function getPosts() {
      setIsFetching(true);
      try {
        const posts = await fetchPostList('?lightning=true');
        dispatch(setLightningPosts(posts));
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

export default FastMeetScreen;
