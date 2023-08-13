import {useCallback, useEffect, useState} from 'react';
import {
  ImagePickerResponse,
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {Pressable, Text} from 'react-native';

const OneImagePicker = ({onSetImages}: {onSetImages: any}) => {
  const [images, setImages] = useState<ImagePickerResponse>();

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

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        setImages(response);
      }
    });
  }, []);

  useEffect(() => {
    onSetImages(images);
  }, [images]);

  return (
    <Pressable onPress={pickImage}>
      <Text>이미지 선택</Text>
    </Pressable>
  );
};

export default OneImagePicker;
