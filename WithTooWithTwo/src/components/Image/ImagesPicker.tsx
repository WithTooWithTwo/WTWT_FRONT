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
import ImageResizer from '@bam.tech/react-native-image-resizer';

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
          ImageResizer.createResizedImage(
            response.assets![0].uri,
            600,
            600,
            response.assets![0].type!.includes('png') ? 'PNG' : 'JPEG',
            100,
            0,
          ).then(r => {
            setImages(prevState => {
              const updatedImages = [...prevState];

              updatedImages.push({
                uri:
                  Platform.OS === 'android'
                    ? r.uri
                    : r.uri.replace('file://', ''),
                name: r.name,
                type: response.assets![0].type!.includes('png')
                  ? 'PNG'
                  : 'JPEG',
              });
              return updatedImages;
            });
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
