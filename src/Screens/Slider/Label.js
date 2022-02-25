import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal:4,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default memo(Label);