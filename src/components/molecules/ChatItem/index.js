import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import IsMe from './isMe';
import Other from './other';

const ChatItem = ({isMe, text, date, avatar}) => {
  if (isMe) {
    return <IsMe text={text} date={date} />;
  }
  return <Other text={text} date={date} avatar={avatar} />;
};

export default ChatItem;
