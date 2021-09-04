import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ChatItem, Header, InputChat} from '../../components';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError,
  showSuccess,,
} from '../../utils';
const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    getChattingAll();
  }, [dataDoctor.data.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  const getChattingAll = () => {
    const db = getDatabase();
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chating/${chatID}/allChat/`;
    const chatRef = ref(db, urlFirebase);
    onValue(chatRef, snapshot => {
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        const newDataChat = [];
        Object.keys(dataSnapshot).map(key => {
          const dataChat = dataSnapshot[key];

          Object.keys(dataChat).map(itemChat => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat],
            });
          });

          allDataChat.push({
            id: key,
            data: newDataChat,
          });
        });
        setChatData(allDataChat);
        console.log('data chat: ', allDataChat);
      }
    });
  };

  const chatSend = () => {
    const today = new Date();
    const dataChat = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    const db = getDatabase();
    const newChatKey = push(child(ref(db), 'chatting')).key;
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chating/${chatID}/allChat/${setDateChat(
      today,
    )}/${newChatKey}`;

    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;
    const DataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const DataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    const updates = {};
    updates[urlFirebase] = dataChat;
    update(ref(db), updates)
      .then(res => {
        set(ref(db, urlMessageUser), DataHistoryChatForUser);
        set(ref(db, urlMessageDoctor), DataHistoryChatForDoctor);
        showSuccess('Berhasil mengirim pesan');
        setChatContent('');
      })
      .catch(error => {
        showError(error.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.data.fullName}
        subTitle={dataDoctor.data.profession}
        avatar={{uri: dataDoctor.data.photo}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      avatar={isMe ? null : {uri: dataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        patner={dataDoctor.data.fullName}
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
