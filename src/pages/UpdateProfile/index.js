import {getAuth, updatePassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, showError, showSuccess, storeData} from '../../utils';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    photo: ILNullPhoto,
  });

  const [photo, setPhoto] = useState(ILNullPhoto);
  const [password, setPassword] = useState('');
  const [photoForDB, setPhotoForDB] = useState('');
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setPhotoForDB(res.photo);
      setProfile(data);
    });
  }, []);

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6 karakter');
      } else {
        updateActionPassword();
        updateProfileData();
        navigation.navigate('MainApp');
      }
    } else {
      updateProfileData();
      navigation.navigate('MainApp');
    }
  };

  const updateActionPassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    updatePassword(user, password)
      .then(() => {
        showSuccess('Berhasil mengubah profile');
      })
      .catch(error => {
        showError(error.message);
      });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;
    const db = getDatabase();
    set(ref(db, 'users/' + profile.uid), data)
      .then(res => {
        storeData('user', data);
      })
      .catch(error => {
        showError(error.message);
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true},
      response => {
        if (response.didCancel || response.error) {
          showMessage({
            message: 'opps, sepertinya anda tidak memilih foto nya ?',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          const source = {uri: response.assets[0].uri};
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          setPhoto(source);
        }
      },
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <Header title="Edit Profile" onPress={() => navigation.goBack()} />
        {profile.fullName.length > 0 && (
          <Profile
            avatar={photo}
            name={profile.fullName}
            desc={profile.profession}
            isRemove
            onPress={getImage}
          />
        )}
        <Gap height={26} />
        <View style={styles.content}>
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" disable value={profile.email} />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
