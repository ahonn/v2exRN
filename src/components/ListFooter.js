import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import theme from '../config/theme';

const ListFooter = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.hint}>
        —————— 这是我的底线 ——————
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: theme.color.lightGrey,
  },
  hint: {
    fontSize: 12,
    textAlign: 'center',
  }
});

export default ListFooter;
