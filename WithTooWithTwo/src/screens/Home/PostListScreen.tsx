import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MainTabParamList} from './MainScreen';
import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  const category = useSelector((state: RootState) => state.filtering.category);

  const [filtering, setFiltering] = useState<FilteringType>({});
  const [order, setOrder] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [maxHeadCount, setMaxHeadCount] = useState<number | null>(null);

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
        const fetchedPosts = await fetchFilteredPosts(filtering);
        if (filtering.order === 'RECENT' || !filtering.order)
          dispatch(setPosts(fetchedPosts.reverse()));
        else dispatch(setPosts(fetchedPosts));
      } catch (error) {
        console.log(error);
      }
    }

    getPosts();
  }, [filtering, isFocused]);

  return (
    <>
      <SafeAreaView
        style={{backgroundColor: '#F8F8F9', paddingBottom: 50, flex: 1}}>
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
