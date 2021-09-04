import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Other = ({text, date, avatar}) => {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  chatContent: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.primary,
    maxWidth: '80%',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.white,
    marginTop: 8,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12,
  },
});
