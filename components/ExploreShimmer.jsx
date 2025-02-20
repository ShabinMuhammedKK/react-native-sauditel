import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ExploreShimmer = () => {
  return (
    <>
      <View style={styles.bannerContainer}>
        <View style={styles.bannerItem}></View>
      </View>
      <View style={styles.infoContainer}>
        <View style={[styles.infoCard, {backgroundColor: '#e2e2e2'}]}></View>
        <View style={[styles.infoCard, {gap: 12}]}>
          <View style={styles.infoSubCard}></View>
          <View style={styles.infoSubCard}></View>
        </View>
      </View>
    </>
  );
};

export default ExploreShimmer;

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 260,
    padding: 10,
  },
  infoContainer: {
    width: '100%',
    height: 300,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  infoCard: {
    height: '90%',
    flex: 2,
    borderRadius: 8,
  },
  infoSubCard: {
    flex: 2,
    borderRadius: 8,
    backgroundColor: '#e2e2e2',
  },
  bannerItem: {
    height: '90%',
    borderRadius: 8,
    backgroundColor: '#e2e2e2',
  },
});
