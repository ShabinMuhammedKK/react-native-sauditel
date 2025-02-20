import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';
import React, {useEffect, useState, version} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useUser} from '../../store/userContext';
import {useNavigation} from '@react-navigation/native';
import OtpInputB0x from '../../components/OtpInputB0x';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../login';
import {useAsyncStorage} from '../../lib/customHooks';

const EnterPinScreen = () => {
  const {state, dispatch} = useUser();
  const navigation = useNavigation();
  const [pin, setPin] = useState([]);
  const {data} = useAsyncStorage('user_datas');

  useEffect(() => {
    if (pin.join('').length === 4) {
      onSubmitHandler();
    }
  }, [pin]);

  useEffect(() => {
    if (data) {
      const {firstName, username, token} = data;
      dispatch({
        type: 'LOGIN_SUCCESS',
        firstName,
        username,
        token,
      });
    }
  }, [data]);

  const onOtpInput = (index, value) => {
    const newOtp = [...pin];
    newOtp[index] = value;
    setPin(newOtp);
  };

  const onSubmitHandler = async () => {
    const password = pin.join('');
    if (password.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Please enter 4-digit pin',
      });
      return;
    }

    try {
      const response = await axios.post(
        'https://sauditel.codesap.com/api/user/authenticate-for-txn/',
        {txn_password: password, version: '1.0'},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Token ' + state.token,
          },
        },
      );

      if (response?.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Verified successfully!',
          onHide: () => {
            navigation.replace('Explore-Screen');
          },
        });
        navigation.replace('Explore-Screen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: 'Invalid Pin number',
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={styles.container}>
        <View style={styles.loginTitle}>
          <Text style={{fontSize: 40, fontWeight: '500', color: '#3a81fc'}}>
            Verification
          </Text>
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            Enter the code to continue
          </Text>
          <Toast config={toastConfig} />
        </View>
        <View style={styles.loginGraphics}>
          <Image
            source={require('../../assets/images/verificationImg.png')}
            resizeMode="cover"
          />
        </View>
        <View style={styles.loginActions}>
          <View style={styles.inputBox}>
            <OtpInputB0x
              onOtpInput={onOtpInput}
              index={0}
              onSubmit={onSubmitHandler}
            />
            <OtpInputB0x
              onOtpInput={onOtpInput}
              index={1}
              onSubmit={onSubmitHandler}
            />
            <OtpInputB0x
              onOtpInput={onOtpInput}
              index={2}
              onSubmit={onSubmitHandler}
            />
            <OtpInputB0x
              onOtpInput={onOtpInput}
              index={3}
              onSubmit={onSubmitHandler}
            />
          </View>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#3a81fc'}]}
            onPress={() => onSubmitHandler()}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
              Continue
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 16}}>
            Don't receive the code?{' '}
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#3a81fc'}}>
              Send Again
            </Text>
          </Text>
        </View>
        <View
          style={{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon name="arrow-left" size={18} color="#000" />

          <Text
            onPress={() => navigation.goBack('Login-Screen')}
            style={{fontSize: 16, fontWeight: 'bold'}}>
            {' '}
            Back to login?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterPinScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginTitle: {
    height: 120,
    padding: 30,
  },
  loginGraphics: {
    alignItems: 'center',
  },
  loginActions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
  },
  btn: {
    paddingVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 8,
    height: 56,
  },
  inputBox: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});
