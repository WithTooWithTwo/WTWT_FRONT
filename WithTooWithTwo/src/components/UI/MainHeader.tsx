import {StyleSheet, Text, View} from 'react-native';

function MainHeader({title}: {title: string}) {
  return (
    <View style={styles.headerZone}>
      <Text style={styles.headerText}>{title} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {},
  container: {},
  headerZone: {
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingTop: 60,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
});

export default MainHeader;
