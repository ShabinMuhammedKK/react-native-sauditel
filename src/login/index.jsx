import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useUser} from '../../store/userContext';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {useAsyncStorage} from '../../lib/customHooks';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {dispatch} = useUser();
  const {setToAsyncStorage} = useAsyncStorage('user_datas');

  const onSubmitHandler = async () => {
    if (!credentials.username.trim() || !credentials.password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Please enter username and passowrd',
      });
      return;
    }
    try {
      const response = await axios.post(
        'https://sauditel.codesap.com/api/user/login/',
        credentials,
      );

      if (response.data.success) {
        const {username, first_name, token} = response.data;

        await setToAsyncStorage({
          firstName: first_name,
          username,
          token,
        });

        dispatch({
          type: 'LOGIN_SUCCESS',
          firstName: first_name,
          username,
          token,
        });

        navigation.replace('EnterPin-Screen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: 'Enter valid username or password',
        });
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={{fontSize: 36, fontWeight: '500', color: '#3a81fc'}}>
              Login Account
            </Text>

            <Text style={{fontSize: 16, fontWeight: '500'}}>Welcome Back!</Text>
            <Toast config={toastConfig} />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 380,
              backgroundColor: '#fff',
            }}>
            <Image
              source={require('../../assets/images/loginInputimg.jpeg')}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <Text style={{fontWeight: '500'}}>Username</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter username"
                placeholderTextColor="gray"
                value={credentials.username}
                onChangeText={newInput =>
                  setCredentials({
                    ...credentials,
                    username: newInput,
                  })
                }
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={{fontWeight: '500'}}>Password</Text>
              <View
                style={[
                  styles.inputField,
                  {
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <TextInput
                  style={{color: '#000', flex: 1, fontWeight: 'bold'}}
                  placeholder="Enter password"
                  placeholderTextColor="gray"
                  value={credentials.password}
                  secureTextEntry={!isShowPassword}
                  onChangeText={newInput =>
                    setCredentials({
                      ...credentials,
                      password: newInput,
                    })
                  }
                />
                <TouchableOpacity
                  onPress={() => setIsShowPassword(!isShowPassword)}>
                  <Icon
                    name={isShowPassword ? 'eye-off' : 'eye'}
                    size={28}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={onSubmitHandler}
              style={[styles.btn, {backgroundColor: '#3a81fc'}]}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                Login
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize: 16}}>
              Don't have an account?{' '}
              <Text
                onPress={() => navigation.navigate('Landing-Screen')}
                style={{fontSize: 16, fontWeight: 'bold', color: '#3a81fc'}}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    height: 120,
    padding: 30,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#d6d4d4',
    borderRadius: 6,
    height: 56,
    paddingHorizontal: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  inputBox: {
    width: '80%',
    gap: 3,
  },
  btn: {
    paddingVertical: 16,
    width: '80%',
    alignItems: 'center',
    borderRadius: 8,
  },
  toast: {},
});

export const toastConfig = {
  error: ({text1, text2}) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: 'tomato',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        borderRadius: 8,
      }}>
      <Icon name="alert-circle" size={36} color="#fff" />
      <View style={{}}>
        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
          {text1}
        </Text>
        <Text style={{color: '#fff'}}>{text2}</Text>
      </View>
    </View>
  ),
  success: ({text1, text2}) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        borderRadius: 8,
      }}>
      <Icon name="check-circle" size={36} color="#fff" />
      <View style={{}}>
        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
          {text1}
        </Text>
        <Text style={{color: '#fff'}}>{text2}</Text>
      </View>
    </View>
  ),
};
