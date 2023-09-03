import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {
  fetchFilteredPosts,
  fetchPostList,
  FilteringType,
} from '../../util/post';
import {PostsType, setLightningPosts, setPosts} from '../../slices/postsSlice';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import PostOutput from '../../components/List/PostOutput';
import FilterPosts from '../../components/Filtering/FilterPosts';

type FastMeetProps = MaterialTopTabScreenProps<MainTabParamList, 'Thunder'>;
function ThunderScreen() {
  // const [posts, setPosts] = useState(Array<PostsType>);
  const [isFetching, setIsFetching] = useState(true);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.lightningPosts);
  const category = useSelector((state: RootState) => state.filtering.category);
  const [filtering, setFiltering] = useState<FilteringType>({
    lightning: true,
  });

  useEffect(() => {
    async function getPosts() {
      try {
        setIsFetching(true);
        // console.log('1');
        // const posts = await fetchFilteredPosts(filtering);
        // dispatch(setLightningPosts(posts));
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }
    getPosts();
  }, [category, filtering]);

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#F8F8F9', paddingBottom: 30}}>
        <FilterPosts filtering={filtering} setFiltering={setFiltering} />
        <PostOutput posts={posts} />
      </SafeAreaView>
    </>
  );
}

export default ThunderScreen;
