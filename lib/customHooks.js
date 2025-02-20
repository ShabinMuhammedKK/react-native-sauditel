import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export const useAsyncStorage = key => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await AsyncStorage.getItem(key);
        setData(response ? JSON.parse(response) : null);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [key]);

  const setToAsyncStorage = async updatedData => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(updatedData));
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };
  const clearFromAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      setData(null);
    } catch (error) {
      console.log(error);
    }
  };

  return {data, setToAsyncStorage, clearFromAsyncStorage};
};
