import {
  child,
  get,
  getDatabase,
  limitToFirst,
  orderByChild,
  query,
  ref,,
} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,,
} from '../../components';
import {colors, fonts, getData, showError} from '../../utils';

const Doctor = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });
  const [news, setNews] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [category_doctor, setCategory_doctor] = useState([]);
  useEffect(() => {
    getDataUser();
    getTopRatedDoctors();
    getCategoryDoctor();
    getNews();
  }, []);

  const getTopRatedDoctors = () => {
    const db = getDatabase();
    get(query(ref(db, 'doctors', orderByChild('rate')), limitToFirst(3)))
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
        }
      })
      .catch(error => {
        showError(error.message);
      });
  };

  const getDataUser = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  };

  const getCategoryDoctor = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'category_doctor/'))
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setCategory_doctor(filterData);
        }
      })
      .catch(error => {
        showError(error.message);
      });
  };

  const getNews = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'news/'))
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setNews(filterData);
        }
      })
      .catch(error => {
        showError(error.message);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              name={profile.fullName}
              desc={profile.profession}
              avatar={profile.photo}
              onPress={() => navigation.navigate('UserProfile')}
            />
            <Text style={styles.welcome}>
              Who do you want to consult with today ?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {category_doctor.map(item => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}

                <Gap width={12} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctor</Text>

            {doctors.map(doctor => {
              return (
                <RatedDoctor
                  key={doctor.uid}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  avatar={{uri: doctor.data.photo}}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}

            <Text style={styles.sectionLabel}> Good News</Text>
          </View>
          {news.map(item => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
});
