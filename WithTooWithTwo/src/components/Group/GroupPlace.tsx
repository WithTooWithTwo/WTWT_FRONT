import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../constants/styles';
import {fetchGroup, GroupType, PlaceType, storePlace} from '../../util/group';

import GroupLinkPreview from './GroupLinkPreview';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  const [toggle, setToggle] = useState<boolean>(false);

  const changeNameHandler = (text: string) => {
    setPlaceName(text);
  };
  const changeLinkHandler = (text: string) => {
    setPlaceLink(text);
  };

  const pressToggle = () => {
    setToggle(prevState => !prevState);
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
        <Pressable onPress={pressToggle}>
          <AntDesign name="pluscircle" color={Colors.primary500} size={17} />
        </Pressable>
      </View>
      <View style={styles.scroll}>
        <ScrollView
          horizontal={true}
          style={styles.placeContent}
          showsHorizontalScrollIndicator={false}>
          {places.map(el => (
            <View key={el.id} style={styles.placeItem}>
              <GroupLinkPreview url={el.link + ''} />
            </View>
          ))}
        </ScrollView>
        <View style={toggle ? styles.inputBlock : styles.none}>
          <TextInput
            value={placeLink}
            style={styles.linkInput}
            placeholder="링크를 입력하세요"
            onChangeText={changeLinkHandler}
            clearButtonMode="while-editing"
          />
          <Pressable style={styles.placeButton} onPress={submitPlaceHandler}>
            <AntDesign name={'enter'} size={17} color={Colors.grey4} />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    padding: 10,
    gap: 10,
    borderTopStartRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#FFF',
  },
  placeTitleText: {
    color: Colors.primary500,
    fontSize: 13,
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  placeItem: {
    marginRight: 17,
    width: 140,
    height: 110,
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
    width: 250,
  },
  placeButton: {
    marginRight: -5,
  },
  metadata: {
    // height: 15,
    // overflow: 'hidden',
    display: 'none',
  },

  none: {
    display: 'none',
  },
});
export default GroupPlace;
