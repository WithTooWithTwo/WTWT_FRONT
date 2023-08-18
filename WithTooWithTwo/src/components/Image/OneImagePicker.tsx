import {useCallback, useEffect, useState} from 'react';
import {
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {Platform, Pressable, Text} from 'react-native';
import {ImageType} from '../../slices/postsSlice';

const OneImagePicker = ({onSetImages}: {onSetImages: any}) => {
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
          try {
            setImage({
              uri:
                Platform.OS === 'android'
                  ? response.assets[0].uri
                  : response.assets[0].uri!.replace('file://', ''),
              name: response.assets[0].fileName!,
              type: response.assets[0].type!.includes('png') ? 'PNG' : 'JPEG',
            });
          } catch (error: any) {
            console.log('ImageResizer Error:', error.message);
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    onSetImages(image);
  }, [image]);

  return (
    <Pressable onPress={pickImage}>
      <Text>이미지 선택</Text>
    </Pressable>
  );
};

export default OneImagePicker;
