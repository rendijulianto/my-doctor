import {getDatabase, ref, update} from 'firebase/database';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Link} from '../../components';
import {colors, fonts, showError, showSuccess, storeData} from '../../utils';
const UploadPhoto = ({navigation, route}) => {
  const {fullName, profession, uid} = route.params;
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');
  const getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true},
      response => {
        if (response.didCancel || response.error) {
          showError('Opps, sepertinya anda tidak memilih foto nya ?');
        } else {
          showSuccess('Berhasil memilih foto...');
          const source = {uri: response.assets[0].uri};
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
  };

  const uploadAndContinue = () => {
    const db = getDatabase();
    const data = route.params;
    data.photo = photoForDB;
    storeData('user', data);
    update(ref(db, 'users/' + uid), {photo: photoForDB});
    navigation.replace('MainApp');
  };
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {/* <IconRemovePhoto /> */}
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
});
