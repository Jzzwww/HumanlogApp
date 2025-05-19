import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface AppUsageCardProps {
  hours: number;
  apps: string[];
}

const AppUsageCard: React.FC<AppUsageCardProps> = ({ hours, apps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>情绪状态</Text>
        <Text style={styles.title}>偏离标准</Text>
        <Text style={styles.subtitle}>检测到焦虑值过高</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 15,
    height: 120,
  },
  headerContainer: {
    flex: 1,
  },
  label: {
    color: '#9E9E9E',
    fontSize: 12,
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  subtitle: {
    color: '#FF3B30',
    fontSize: 12,
  }
});

export default AppUsageCard; 