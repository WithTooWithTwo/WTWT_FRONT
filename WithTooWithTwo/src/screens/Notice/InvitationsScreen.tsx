import {FlatList, StyleSheet, View} from 'react-native';
import NewsItem from '../../components/Notice/NewsItem';
import InvitationItem from '../../components/Notice/InvitationItem';
import {useEffect, useState} from 'react';
import {AlarmType, patchAlarms} from '../../util/group';

function InvitationsScreen() {
  const [alarms, setAlarms] = useState<AlarmType[]>();
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    patchAlarms().then(r => {
      setAlarms(r.filter(item => item.read === false));
    });
  }, [reload]);

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        renderItem={({item}) => (
          <InvitationItem alarm={item} setReload={setReload} />
        )}
        keyExtractor={(item, i) => item.id + i}
      />
      {/*{alarms &&*/}
      {/*  alarms.map(*/}
      {/*    (alarm, i) =>*/}
      {/*      alarm.read === false && (*/}
      {/*        <InvitationItem key={alarm.id + i} alarm={alarm} />*/}
      {/*      ),*/}
      {/*  )}*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default InvitationsScreen;
