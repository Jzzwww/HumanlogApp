import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useUserContext } from '../utils/UserContext';

const HeaderCard: React.FC = () => {
  const { userData, generateSampleId } = useUserContext();
  const sampleId = generateSampleId();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image source={require('../../assets/images/home_avatar.png')} style={styles.avatarImage} />
        </View>
      </View>
      <View style={styles.infoContainerRow}>
        <Text style={styles.sampleLabel}>{'人类\n女性'.replace('\\n', '\n')}</Text>
        <Text style={styles.sampleIdLarge}>EAC-027</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 64,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 64,
    height: 80,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  infoContainerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sampleLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  sampleIdLarge: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
});

export default HeaderCard; 