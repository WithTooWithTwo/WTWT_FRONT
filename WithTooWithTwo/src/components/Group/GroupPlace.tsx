import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../constants/styles';
import {
  fetchGroup,
  GroupType,
  NoticeType,
  PlaceType,
  storePlace,
} from '../../util/group';
import {LinkPreview} from '@flyerhq/react-native-link-preview';
import {PreviewDataImage} from '@flyerhq/react-native-link-preview/lib/types';

const GroupPlace = ({
  groupId,
  places,
  setGroup,
}: {
  groupId: string;
  places: PlaceType[];
  setGroup: (group: GroupType) => void;
}) => {
  const [placeName, setPlaceName] = useState<string>('');
  const [placeLink, setPlaceLink] = useState<string>('');

  useEffect(() => {
    console.log(places);
  }, []);
  const changeNameHandler = (text: string) => {
    setPlaceName(text);
  };
  const changeLinkHandler = (text: string) => {
    setPlaceLink(text);
  };

  const temp = {
    description: '',
  };

  const submitPlaceHandler = async () => {
    try {
      const response = await storePlace(groupId, placeName, placeLink);
      fetchGroup(response.result).then(res => {
        setGroup(res);
      });
    } catch (e) {
      console.log(e);
    }
    setPlaceName('');
    setPlaceLink('');
  };

  return (
    <View style={styles.placeBox}>
      <View style={styles.placeTitle}>
        <Text style={styles.placeTitleText}>꼭 들릴 맛집</Text>
      </View>
      <View style={styles.scroll}>
        <ScrollView horizontal={true} style={styles.placeContent}>
          {places.map(el => (
            <View key={el.id} style={styles.placeItem}>
              {/*<Image*/}
              {/*  style={styles.placeImage}*/}
              {/*  source={require('../../assets/place1.png')}*/}
              {/*/>*/}
              {/*<Text style={styles.placeText}>*/}
              {/*  {el.name.length > 20 ? el.name.slice(0, 20) + '...' : el.name}*/}
              {/*</Text>*/}
              <Text style={styles.placeText}>{el.name}</Text>
              {/*<LinkPreview*/}
              {/*  text={el.link + ''}*/}
              {/*  textContainerStyle={styles.metadata}*/}
              {/*  containerStyle={styles.placeImage}*/}
              {/*  metadataTextContainerStyle={styles.metadata}*/}
              {/*  enableAnimation*/}
              {/*/>*/}
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputBlock}>
          <TextInput
            value={placeName}
            style={styles.nameInput}
            placeholder="이름"
            onChangeText={changeNameHandler}
            clearButtonMode="while-editing"
          />
          <TextInput
            value={placeLink}
            style={styles.linkInput}
            placeholder="링크"
            onChangeText={changeLinkHandler}
            clearButtonMode="while-editing"
          />
          <Pressable style={styles.placeButton} onPress={submitPlaceHandler}>
            <Text>저장</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeBox: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  placeTitle: {
    backgroundColor: '#FFF',
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 6,
    borderTopRightRadius: 6,
  },
  placeTitleText: {
    color: Colors.primary500,
    fontSize: 14,
    fontWeight: '600',
  },
  scroll: {
    borderTopEndRadius: 6,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    backgroundColor: '#FFF',
  },
  placeContent: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  placeItem: {
    marginRight: 12,
    width: 140,
    height: 110,
    gap: 15,
  },
  placeImage: {
    width: 140,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: 'red',
  },
  placeText: {
    width: 140,
    fontSize: 13,
    fontWeight: '400',
  },
  inputBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.grey0,
    borderRadius: 5,
  },
  nameInput: {
    width: 70,
  },
  linkInput: {
    width: 170,
  },
  placeButton: {
    width: 40,
  },
  metadata: {
    // height: 15,
    // overflow: 'hidden',
    display: 'none',
  },
});
export default GroupPlace;