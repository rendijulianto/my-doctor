import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';
import DarkProfile from './DarkProfile';

const Header = ({onPress, title, type, avatar, subTitle}) => {
  if (type === 'dark-profile') {
    return (
      <DarkProfile
        title={title}
        subTitle={subTitle}
        avatar={avatar}
        onPress={onPress}
      />
    );
  }
  return (
    <View style={styles.container(type)}>
      <Button
        title="Header"
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      {/* <IconBackDark /> */}
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: type => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
  }),
  text: type => ({
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: type === 'dark' ? colors.white : colors.text.primary,
    textTransform: 'capitalize',
  }),
});
