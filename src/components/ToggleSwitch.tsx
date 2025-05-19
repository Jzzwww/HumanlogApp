import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  color?: string;
  isActive?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  isOn, 
  onToggle, 
  color = '#FFDD00',
  isActive = true
}) => {
  const backgroundColor = isOn 
    ? isActive ? color : '#656A72' 
    : '#656A72';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, { backgroundColor }]}
      onPress={onToggle}
      disabled={!isActive}
    >
      <View style={[
        styles.circle,
        isOn ? styles.circleRight : styles.circleLeft,
      ]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 2,
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  circleRight: {
    alignSelf: 'flex-end',
  },
  circleLeft: {
    alignSelf: 'flex-start',
  },
});

export default ToggleSwitch; 