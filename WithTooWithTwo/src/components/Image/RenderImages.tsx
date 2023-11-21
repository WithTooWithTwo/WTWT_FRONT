import {Image, View} from 'react-native';
import React from 'react';
import {ImageType} from '../../slices/postsSlice';

const RenderImages = ({images, size}: {images: ImageType[]; size: number}) => {
  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      {images.map((img: any, i: any) => (
        <Image
          key={i}
          source={{uri: `${img.uri}`}}
          style={{
            width: size,
            height: size,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        />
      ))}
    </View>
  );
};

export default RenderImages;
