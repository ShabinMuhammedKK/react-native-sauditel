import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../src/login';
import EnterPinScreen from '../src/enter_pin';
import LandingScreen from '../src/landing_page';
import ExploreScreen from '../src/explore';
import {useAsyncStorage} from '../lib/customHooks';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {data} = useAsyncStorage('user_datas');

  useEffect(() => {
    setInitialRoute(data !== null ? 'EnterPin-Screen' : 'Landing-Screen');
    setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#3a81fc" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator key={initialRoute} initialRouteName={initialRoute}>
        <Stack.Screen
          name="Explore-Screen"
          component={ExploreScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EnterPin-Screen"
          component={EnterPinScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login-Screen"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Landing-Screen"
          component={LandingScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
