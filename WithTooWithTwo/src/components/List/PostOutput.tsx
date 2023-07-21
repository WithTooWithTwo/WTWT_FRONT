import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {PostsType} from '../../slices/postsSlice';
import PostItem from './PostItem';

function PostOutput({posts}: {posts: PostsType[]}) {
  const renderPostItem = ({itemData}: {itemData: PostsType}) => {
    return <PostItem {...itemData} />;
  };
  return (
    <>
      <FlatList
        style={styles.container}
        data={posts}
        renderItem={({item}) => renderPostItem({itemData: item})}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {padding: 30},
});
export default PostOutput;
