import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {fonts} from '../../../utils';
import {colors} from '../../../utils/colors';
import {Button} from '../../atoms';
const InputChat = ({value, onChangeText, onButtonPress, patner}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`Tulis Pesan Untuk ${patner}`}
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        title="send"
        type="btn-icon-send"
        disable={value.length < 1}
        onPress={onButtonPress}
      />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 45,
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
});
