import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {child, get, getDatabase, ref} from 'firebase/database';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {colors, fonts, showError, storeData, useForm} from '../../utils';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({email: '', password: ''});
  const dispacth = useDispatch();

  const login = () => {
    dispacth({type: 'SET_LOADING', value: true});

    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        dispacth({type: 'SET_LOADING', value: false});
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              storeData('user', snapshot.val());
              navigation.replace('MainApp');
            } else {
              showError('No data available');
            }
          })
          .catch(error => {
            showError(error.message);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showError(error.message);
        dispacth({type: 'SET_LOADING', value: false});
      });
  };

  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link title="Forgot My Password ?" size={12} />
          <Gap height={40} />
          <Button title="Sign In" onPress={login} />
          <Gap height={30} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: 153,
    marginVertical: 40,
  },
});
