import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../Authenticated/HomeScreen';
import {RouteProp} from '@react-navigation/native';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScreenHeader from '../../components/UI/ScreenHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '../../constants/styles';
import PostInfo from '../../components/List/PostInfo';
import {fetchImage, fetchOnePost} from '../../util/post';
import {ImageType, PostsType, setNormalPosts} from '../../slices/postsSlice';

const URL = 'http://3.39.87.78:8080/';

type PostDetailScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PostDetail'
>;
type PostDetailScreenRouteProp = RouteProp<HomeStackParamList, 'PostDetail'>;

type PostDetailScreenProps = {
  navigation: PostDetailScreenNavigationProp;
  route: PostDetailScreenRouteProp;
};

function PostDetail({navigation, route}: PostDetailScreenProps) {
  const selectedPostId = route.params?.postId;
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostsType | null>(null);

  useEffect(() => {
    async function getPosts() {
      try {
        const posts = await fetchOnePost(selectedPostId);
        setSelectedPost(posts);

        for (let i = 0; i < posts.images!.length; i++) {
          const temp = posts.images![i];
          const newImage = await fetchImage(temp.toString());
          setImageUrl(prevState => {
            const updatedImages = [...prevState];
            updatedImages.push(newImage);
            return updatedImages;
          });
        }
        //const temp = posts.images![0];
        //
        // setImageUrl(await fetchImage(temp.toString()));
        //console.log(await fetchImage(temp.toString()));
      } catch (error: any) {
        console.log(error.message);
      }
    }
    getPosts();
  }, [selectedPostId]);

  if (!selectedPost) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          {/* 로딩 상태에 대한 UI */}
          <Text>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  const renderImages = () => {
    return imageUrl.map((image, i) => (
      <Image
        key={i}
        source={{uri: 'file://' + image}}
        style={{width: 200, height: 200}}
      />
    ));
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <ScreenHeader color="white" isGoBack={true} />
          <ScrollView>
            <View style={styles.headerBox}>
              <Text style={styles.title}>{selectedPost.title}</Text>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>2023.04.22</Text>
                <View style={styles.viewsBox}>
                  <Ionicons name="eye" color="#3C70FF99" size={14} />
                  <Text style={styles.viewsText}>{selectedPost.hits}</Text>
                </View>
              </View>
              <View style={styles.writerBox}>
                <Image
                  source={require('../../assets/group_main.png')}
                  style={styles.writerImage}
                />
                <Text style={styles.writerText}>
                  {selectedPost.writer.nickname}
                </Text>
              </View>
            </View>
            <PostInfo postData={selectedPost} />
            <View style={styles.contentBox}>
              <Text style={styles.contentText}>{selectedPost.content}</Text>
              <View style={styles.imageBox}>{imageUrl && renderImages()}</View>
            </View>
          </ScrollView>
          <View style={styles.chatBox}>
            <Pressable style={styles.chatButton}>
              <Text style={styles.chatText}> 1:1 채팅하기</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerBox: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
  },
  dateBox: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '300',
    color: Colors.grey4,
    marginRight: 25,
  },
  viewsBox: {
    flexDirection: 'row',
  },
  viewsText: {
    fontSize: 12,
    fontWeight: '300',
    color: Colors.grey4,
    marginLeft: 5,
  },
  writerBox: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  writerImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 20,
  },
  writerText: {
    fontSize: 13,
    fontWeight: '400',
  },
  contentBox: {
    padding: 30,
  },
  contentText: {},
  chatBox: {
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 10,
  },
  chatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary500,
    borderRadius: 10,
    height: 50,
  },
  chatText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
  imageBox: {
    marginTop: 20,
  },
});

export default PostDetail;
