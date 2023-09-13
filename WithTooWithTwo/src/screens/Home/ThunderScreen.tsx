import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {
  fetchFilteredPosts,
  fetchPostList,
  FilteringType,
} from '../../util/post';
import {PostsType, setLightningPosts, setPosts} from '../../slices/postsSlice';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import PostOutput from '../../components/Post/PostOutput';
import FilterPosts from '../../components/Filtering/FilterPosts';

type FastMeetProps = MaterialTopTabScreenProps<MainTabParamList, 'Thunder'>;
function ThunderScreen() {
  // const [posts, setPosts] = useState(Array<PostsType>);
  const [isFetching, setIsFetching] = useState(true);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const posts = useSelector((state: RootState) => state.post.lightningPosts);
  const category = useSelector((state: RootState) => state.filtering.category);

  const [filtering, setFiltering] = useState<FilteringType>({});
  const [order, setOrder] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [maxHeadCount, setMaxHeadCount] = useState<number | null>(null);

  useEffect(() => {
    const test: FilteringType = {
      lightning: true,
    };
    date && (test.date = date);
    maxHeadCount && (test.maxHeadCount = maxHeadCount);
    order && (test.order = order);
    category && (test.category = category);
    setFiltering(test);
  }, [order, date, maxHeadCount, category]);

  useEffect(() => {
    async function getPosts() {
      try {
        const fetchedPosts = await fetchFilteredPosts(filtering);
        dispatch(setLightningPosts(fetchedPosts));
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [filtering, isFocused]);
  return (
    <>
      <SafeAreaView
        style={{backgroundColor: '#F8F8F9', paddingBottom: 30, flex: 1}}>
        <FilterPosts
          filtering={filtering}
          setDate={setDate}
          setOrder={setOrder}
          setMaxHeadCount={setMaxHeadCount}
        />
        <PostOutput posts={posts} />
      </SafeAreaView>
    </>
  );
}

export default ThunderScreen;
