import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface CurrentStatusBoxProps {
  status: string;
  workTime: string;
}

const CurrentStatusBox: React.FC<CurrentStatusBoxProps> = ({ status, workTime }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.label}>当前状态</Text>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.timerText}>{workTime}</Text>
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
    justifyContent: 'center',
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  label: {
    color: '#9E9E9E',
    fontSize: 10,
    marginBottom: 5,
  },
  statusText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  timerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default CurrentStatusBox; 