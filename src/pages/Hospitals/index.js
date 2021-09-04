import {child, get, getDatabase, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILHospitalBG} from '../../assets';
import {ListHospital} from '../../components';
import {colors, fonts} from '../../utils';

const Hospitals = ({navigation}) => {
  const [hospitalsData, setHospitalsData] = useState([]);
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'hospitals/')).then(res => {
      if (res.val()) {
        setHospitalsData(res.val());
      }
      console.log(res.val());
      console.log('res hospital d: ', hospitalsData);
    });
  }, []);
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Near Hospital</Text>
        <Text style={styles.desc}>3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospitalsData.map(item => {
          return (
            <ListHospital
              key={item.id}
              type={item.type}
              name={item.name}
              address={item.address}
              pic={item.image}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: -30,
    flex: 1,
    paddingTop: 14,
  },
});
