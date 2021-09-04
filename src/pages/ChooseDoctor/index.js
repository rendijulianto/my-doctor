import {
  equalTo,
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,,
} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from '../../components';
import {colors} from '../../utils';
const ChooseDoctor = ({navigation, route}) => {
  const doctor_category = route.params;
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getTopRatedDoctors();
  }, []);
  const getTopRatedDoctors = () => {
    // const db = getDatabase();

    const db = getDatabase();
    get(
      query(
        ref(db, 'doctors/'),
        orderByChild('category'),
        equalTo(doctor_category.category),
        limitToLast(100),
      ),
    )
      .then(res => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setDoctors(data);
          console.log('Data 1:  ', data);
        }
        console.log('Data :  ', res.val());
      })
      .catch(error => {
        console.log(error.message);
        showError(error.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={`Pilih ${doctor_category.category}`}
        onPress={() => navigation.goBack()}
      />
      {doctors.map(docktor => {
        return (
          <List
            onPress={() => navigation.navigate('DoctorProfile', docktor)}
            key={docktor.data.uid}
            type="next"
            profile={{uri: docktor.data.photo}}
            name={docktor.data.fullName}
            desc={docktor.data.gender}
          />
        );
      })}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
