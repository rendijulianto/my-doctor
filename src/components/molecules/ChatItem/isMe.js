import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const IsMe = ({text, date}) => {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default IsMe;

const styles = StyleSheet.create({
  chatContent: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.cardLight,
    maxWidth: '70%',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    paddingRight: 16,
  },
  container: {marginBottom: 20, alignItems: 'flex-end'},
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
