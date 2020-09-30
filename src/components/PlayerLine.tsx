import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Player, MainStackParamList } from '../../types';
import getPosition from '../utils';

interface PlayerLineProps {
  player: Player,
  navigation: StackNavigationProp<MainStackParamList>
}

export default ({ player, navigation }: PlayerLineProps) => {
  console.log(player);
  return (
    <TouchableOpacity style={styles.player} onPress={() => navigation.push('Player', player)}>
      <Text style={styles.name} numberOfLines={1} >{player.firstname} {player.lastname}</Text>
      <Text style={styles.position}>{getPosition(player.ultraPosition)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  player: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    width: '70%',
  },
  position: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#777777'
  },
})
