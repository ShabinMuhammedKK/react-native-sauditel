import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '../../lib/customHooks';

const LandingScreen = () => {
  const navigation = useNavigation();
  const {data} = useAsyncStorage('user_datas');

  console.log('async storage data after clear: ', data);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={styles.container}>
        <View style={styles.loginTitle}>
          <Text style={{fontSize: 40, fontWeight: '500', color: '#3a81fc'}}>
            Welcome
          </Text>
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            Login to continue
          </Text>
        </View>
        <View style={styles.loginGraphics}>
          <Image
            source={require('../../assets/images/loginImg.png')}
            resizeMode="cover"
          />
          <Text style={{fontSize: 56, fontWeight: 'bold', color: '#3a81fc'}}>
            Sauditel
          </Text>
          <Text style={{fontSize: 16, fontWeight: '400', marginTop: 16}}>
            Connecting Worlds, Powering Conversations
          </Text>
        </View>
        <View style={styles.loginActions}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#3a81fc'}]}
            onPress={() => navigation.navigate('Login-Screen')}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#3a81fc',
                borderStyle: 'solid',
              },
            ]}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#3a81fc'}}>
              Create Account
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            Continue as a guest?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

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
    height: 490,
    alignItems: 'center',
  },
  loginActions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btn: {
    paddingVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 8,
    height: 56,
  },
});
