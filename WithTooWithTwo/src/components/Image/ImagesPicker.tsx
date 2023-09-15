import {
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {ImageType} from '../../slices/postsSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ImagesPicker = ({
  onSetImages,
  count = 0,
  style,
}: {
  onSetImages: any;
  count: number;
  style: StyleProp<ViewStyle>;
}) => {
  const [images, setImages] = useState<ImageType[]>([]);

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
        if (response.assets && response.assets[0] && response.assets[0].uri) {
          setImages(prevState => {
            const updatedImages = [...prevState];
            updatedImages.push({
              uri:
                Platform.OS === 'android'
                  ? response.assets![0].uri!
                  : response.assets![0].uri!.replace('file://', ''),
              name: response.assets![0].fileName!,
              type: response.assets![0].type!.includes('png') ? 'PNG' : 'JPEG',
            });
            return updatedImages;
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    onSetImages(images);
  }, [images]);

  return (
    <Pressable
      style={[
        style,
        {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={pickImage}>
      <Ionicons name="camera-outline" color="white" size={30} />
      <Text style={{color: 'white', fontSize: 12}}>{count} / 10</Text>
    </Pressable>
  );
};

export default ImagesPicker;
