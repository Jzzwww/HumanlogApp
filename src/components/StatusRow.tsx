import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface StatusRowProps {
  label: string;
  value: string;
  color?: string;
  background?: string;
}

const StatusRow: React.FC<StatusRowProps> = ({ 
  label, 
  value, 
  color = '#ffffff',
  background = '#2A2A2A'
}) => {
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  label: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default StatusRow; 