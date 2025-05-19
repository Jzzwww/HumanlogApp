import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface TimeManagementBoxProps {
  hours: number;
}

const TimeManagementBox: React.FC<TimeManagementBoxProps> = ({ hours }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.label}>网络使用时间</Text>
        <Text style={styles.hoursText}>{hours}小时</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    height: 80,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#9E9E9E',
    fontSize: 10,
    marginBottom: 5,
  },
  hoursText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  }
});

export default TimeManagementBox; 