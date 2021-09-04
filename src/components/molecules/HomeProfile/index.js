import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {DummyUser, ILNullPhoto} from '../../../assets';
import {colors, fonts, getData} from '../../../utils';
const HomeProfile = ({onPress, avatar, desc, name}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.avatar} source={avatar} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.profession}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
