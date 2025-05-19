import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface AIGoalCardProps {
  title: string;
  content: string;
}

const AIGoalCard: React.FC<AIGoalCardProps> = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>复制</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>编辑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121214',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    color: '#8e8e93',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#29292b',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#4a90e2',
    fontSize: 14,
  },
});

export default AIGoalCard; 