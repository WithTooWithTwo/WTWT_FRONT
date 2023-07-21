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
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({item}) => renderPostItem({itemData: item})}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {margin: 22},
});
export default PostOutput;
