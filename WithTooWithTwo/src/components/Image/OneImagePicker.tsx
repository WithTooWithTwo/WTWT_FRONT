import {useCallback, useEffect, useState} from 'react';
import {
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {
  Image,
  Platform,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {ImageType} from '../../slices/postsSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants/styles';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const OneImagePicker = ({
  onSetImages,
  style,
}: {
  onSetImages: any;
  style: StyleProp<ViewStyle>;
}) => {
  const [image, setImage] = useState<ImageType>();

  const pickImage = useCallback(() => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo' as MediaType,
      quality: 1 as PhotoQuality,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        if (response.assets && response.assets[0] && response.assets[0].uri) {
          ImageResizer.createResizedImage(
            response.assets![0].uri,
            600,
            600,
            response.assets![0].type!.includes('png') ? 'PNG' : 'JPEG',
            100,
            0,
          ).then(r =>
            setImage({
              uri:
                Platform.OS === 'android'
                  ? r.uri
                  : r.uri.replace('file://', ''),
              name: r.name,
              type: response.assets![0].type!.includes('png') ? 'PNG' : 'JPEG',
            }),
          );
        }
      }
    });
  }, []);

  useEffect(() => {
    onSetImages(image);
  }, [image]);

  return (
    <Pressable style={style} onPress={pickImage}>
      <Image
        source={require('../../assets/wtwt_logo_image2.png')}
        style={{
          width: 60,
          height: 40,
        }}
        resizeMethod="resize"
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: 35,
          height: 35,
          borderRadius: 35,
          backgroundColor: Colors.sub,
        }}>
        <Ionicons name="camera-outline" color="white" size={22} />
      </View>
    </Pressable>
  );
};

export default OneImagePicker;
