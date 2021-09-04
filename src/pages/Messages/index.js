import {child, get, getDatabase, onValue, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
const Messages = ({navigation}) => {
  const [historyChats, setHistoryChats] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    getDataUserFromLocal();
    const db = getDatabase();
    const urlHistory = `messages/${user.uid}`;
    const chatRef = ref(db, urlHistory);
    onValue(chatRef, async snapshot => {
      if (snapshot.val()) {
        const dataHistory = [];
        const oldData = snapshot.val();
        const promises = await Object.keys(oldData).map(async key => {
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          await get(child(ref(db), urlUidDoctor)).then(res => {
            dataHistory.push({
              id: key,
              ...oldData[key],
              detailDoctor: res.val(),
            });
          });

          // },
        });
        await Promise.all(promises);
        setHistoryChats(dataHistory);
        console.log('data dataHistor 0: ', dataHistory);
      }
    });
  }, [user.uid]);
  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>

        {historyChats.map(chat => {
          const dataDocktor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting', dataDocktor)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
