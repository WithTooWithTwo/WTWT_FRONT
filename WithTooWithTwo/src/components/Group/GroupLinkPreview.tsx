import {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, Linking, Pressable} from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';

const GroupLinkPreview = ({url}: {url: string}) => {
  const [previewData, setPreviewData] = useState<any>(null);

  useEffect(() => {
    const fetchLinkMetadata = async () => {
      try {
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);

        const title = $('meta[property="og:title"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');

        setPreviewData({title, image});
      } catch (error) {
        console.error('Error fetching link preview data:', error);
        setPreviewData(null);
      }
    };

    fetchLinkMetadata();
  }, [url]);

  if (!previewData) {
    return null;
  }

  const goToUrl = async () => {
    await Linking.openURL(url);
  };

  return (
    <Pressable onPress={goToUrl}>
      <Image source={{uri: previewData.image}} style={styles.image} />
      <Text style={styles.text}>{previewData.title.slice(0, 20)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 80,
  },
  text: {
    marginTop: 10,
  },
});

export default GroupLinkPreview;
