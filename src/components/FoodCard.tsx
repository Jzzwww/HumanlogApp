import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface FoodCardProps {
  title: string;
  calories: number;
}

const FoodCard: React.FC<FoodCardProps> = ({ title, calories }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>最近进食</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.calories}>摄入 {calories} kcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    overflow: 'hidden',
    height: 120,
  },
  textContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
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
  calories: {
    color: '#9E9E9E',
    fontSize: 12,
  }
});

export default FoodCard; 