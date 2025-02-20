import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BannerItem = props => {
  const {company_name, product_name_en, data, price} = props.data;

  return (
    <View style={styles.bannerItem}>
      <Text style={{color: '#3a81fc', fontSize: 32, fontWeight: '700'}}>
        {company_name}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>{product_name_en}</Text>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 14,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
          $ {price}
        </Text>
      </View>
    </View>
  );
};

export default BannerItem;

const styles = StyleSheet.create({
  bannerItem: {
    width: 340,
    borderRadius: 20,
    backgroundColor: '#b5d4f5',
    padding: 20,
    justifyContent: 'space-around',
    marginHorizontal: 0,
  },
});
