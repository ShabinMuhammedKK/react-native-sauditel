import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../store/userContext';
import axios from 'axios';
import BannerItem from '../../components/BannerItem';
import ExploreShimmer from '../../components/ExploreShimmer';
import {useAsyncStorage} from '../../lib/customHooks';

const ExploreScreen = () => {
  const navigation = useNavigation();
  const {state, dispatch} = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {data, clearFromAsyncStorage} = useAsyncStorage('user_datas');

  useEffect(() => {
    setIsLoading(true);
    const getExploreData = async () => {
      const response = await axios.get(
        'https://sauditel.codesap.com/api/cards/home-page/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${state.token}`,
          },
        },
      );

      if (response?.data.favorite_cards) {
        setBanners(response.data);
        setIsLoading(false);
      }
    };

    getExploreData();
  }, []);

  const onLogoutHandle = async () => {
    try {
      await clearFromAsyncStorage();
      dispatch({
        type: 'LOGOUT',
      });
      navigation.replace('Landing-Screen');
    } catch (error) {
      throw new Error(error);
    }
  };

  const onAccountPophandle = () => {
    setIsProfileOpen(value => !value);
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 32, fontWeight: '500', color: '#3a81fc'}}>
          Explore
        </Text>
        <TouchableOpacity
          onPress={onAccountPophandle}
          style={[
            {padding: 4, borderRadius: 8, zIndex: 2, marginTop: 8},
            isProfileOpen
              ? {backgroundColor: '#fff'}
              : {backgroundColor: '#3a81fc'},
          ]}>
          <Icon
            name={isProfileOpen ? 'close' : 'account'}
            size={26}
            color={isProfileOpen ? '#3a81fc' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ExploreShimmer />
      ) : (
        <>
          <View style={styles.bannerContainer}>
            <FlatList
              data={banners.favorite_cards}
              renderItem={({item}) => <BannerItem data={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{width: 6}} />}
            />
          </View>
          <View style={styles.infoContainer}>
            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: '#deecfc',
                  gap: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={{
                  color: '#3a81fc',
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Wallet balanc
              </Text>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: 140,
                  width: 160,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
                  $ {banners.balance}
                </Text>
              </View>
            </View>
            <View style={[styles.infoCard, {gap: 5}]}>
              <View style={styles.infoSubCard}>
                <Text
                  style={{color: '#3a81fc', fontSize: 18, fontWeight: 'bold'}}>
                  Balance to pay
                </Text>
                <View style={styles.subContainer}>
                  <Text
                    style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
                    $ {banners.balance_to_pay}
                  </Text>
                </View>
              </View>
              <View style={styles.infoSubCard}>
                <Text
                  style={{color: '#3a81fc', fontSize: 18, fontWeight: 'bold'}}>
                  Payment dues
                </Text>
                <View style={styles.subContainer}>
                  <Text
                    style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
                    No dues
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
      {isProfileOpen && (
        <View style={styles.logoutPopUp}>
          <View style={styles.popUpContent}>
            <Text style={{fontWeight: 'bold', fontSize: 28, color: '#fff'}}>
              Account
            </Text>
            <View style={styles.accountInfo}>
              <View
                style={{
                  backgroundColor: '#f0f0f0',
                  paddingHorizontal: 10,
                  borderRadius: 8,
                }}>
                <Icon name="account" size={60} color="#3a81fc" />
              </View>

              <View>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#3a81fc'}}>
                  {state.firstName}
                </Text>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: '#3a81fc'}}>
                  {state.username}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center', marginBottom: 10}}>
              <TouchableOpacity
                onPress={onLogoutHandle}
                style={[
                  styles.btn,
                  {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  },
                ]}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {isLoading && (
        <ActivityIndicator
          size={50}
          color={'#3a81fc'}
          style={{paddingVertical: 40}}
        />
      )}
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  bannerContainer: {
    width: '100%',
    height: 230,
    padding: 10,
    gap: 4,
  },
  infoContainer: {
    width: '100%',
    height: 240,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 0,
  },

  infoCard: {
    height: '100%',
    flex: 2,
    borderRadius: 16,
    paddingHorizontal: 5,
  },
  infoSubCard: {
    flex: 2,
    borderRadius: 20,
    backgroundColor: '#deecfc',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  logoutPopUp: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    alignItems: 'center',
    paddingVertical: 3,
  },
  popUpContent: {
    height: 250,
    width: '96%',
    backgroundColor: '#6fb1f7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  btn: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    height: 50,
  },
  accountInfo: {
    height: 70,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: '10%',
    borderRadius: 20,
    marginBottom: 2,
    marginTop: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bannerItem: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#ededed',
  },
  subContainer: {
    backgroundColor: '#fff',
    height: 50,
    width: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
