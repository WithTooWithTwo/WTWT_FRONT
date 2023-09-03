import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  fetchFilteredPosts,
  fetchPostList,
  FilteringType,
} from '../../util/post';
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
import FilterPosts from '../../components/Filtering/FilterPosts';

type PostListProps = MaterialTopTabScreenProps<MainTabParamList, 'PostList'>;
function PostListScreen() {
  //const [posts, setPosts] = useState(Array<PostsType>);
  const [isFetching, setIsFetching] = useState(true);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  const category = useSelector((state: RootState) => state.filtering.category);

  const [filtering, setFiltering] = useState<FilteringType>({});
  const [order, setOrder] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [maxHeadCount, setMaxHeadCount] = useState<number | null>(null);

  useEffect(() => {
    async function getPosts() {
      try {
        setIsFetching(true);
        const posts = await fetchPostList();
        dispatch(setPosts(posts));
      } catch (error) {}
      setIsFetching(false);
    }
    getPosts();
  }, []);

  useEffect(() => {
    const test: FilteringType = {};
    date && (test.date = date);
    maxHeadCount && (test.maxHeadCount = maxHeadCount);
    order && (test.order = order);
    category && (test.category = category);
    setFiltering(test);
  }, [order, date, maxHeadCount, category]);

  useEffect(() => {
    async function getPosts() {
      try {
        console.log(filtering);
        setIsFetching(true);
        const fetchedPosts = await fetchFilteredPosts(filtering);
        dispatch(setPosts(fetchedPosts));
      } catch (error) {}
      setIsFetching(false);
    }
    getPosts();
  }, [filtering]);

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#F8F8F9', paddingBottom: 50}}>
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

export default PostListScreen;
