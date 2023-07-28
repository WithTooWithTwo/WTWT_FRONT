import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {TotalPostType} from '../../util/post';
import PostItem from './PostItem';
import {PostsType} from '../../slices/postsSlice';

function PostOutput({posts}: {posts: TotalPostType[]}) {
  const renderPostItem = ({itemData}: {itemData: TotalPostType}) => {
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
