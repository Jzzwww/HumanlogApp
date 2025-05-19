import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface AISummaryCardProps {
  mainTitle: string;
  subtitle: string;
}

const AISummaryCard: React.FC<AISummaryCardProps> = ({ mainTitle, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{mainTitle}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  mainTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
    lineHeight: 32,
    fontFamily: 'STSong',
  },
  subtitle: {
    color: '#9E9E9E',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'STSong',
  },
});

export default AISummaryCard;
