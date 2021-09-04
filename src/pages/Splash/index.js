import {getAuth, onAuthStateChanged} from 'firebase/auth';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace('MainApp');
          const uid = user.uid;
          // ...
        } else {
          navigation.replace('GetStarted');
        }
      });
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
