import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { getPlayerDetails } from '../services/api/stats';
import { MainStackParamList } from '../../types';
import colors from '../../assets/colors';

interface PlayerProps {
  navigation: StackNavigationProp<MainStackParamList>,
  route: RouteProp<MainStackParamList, 'Player'>
}

export default ({ route, navigation }: PlayerProps) => {
  const player = route.params;
  let [ loading, setLoading ] = useState({});
  let [ details, setDetails ] = useState({});

  const fetchPlayerDetails = async () => {
    try {
      let result = await getPlayerDetails(player.id.slice('player_'.length), '2019');
      console.log('result', result)
      setDetails(result);
    } catch (err) {
      console.error('Error fetching players', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPlayerDetails() }, []);

  type detailsKey = keyof typeof details;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '30%', backgroundColor: colors.gray, alignItems: 'center', padding: 10, marginBottom: 10, borderRadius: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>Retour</Text>
      </TouchableOpacity>
      {!loading ? <FlatList<detailsKey>
        keyExtractor={(_, i) => (i.toString())}
        data={Object.keys(details) as Array<detailsKey>}
        renderItem={({ item }) => (<Text style={{ width: '100%' }}>{item}: {JSON.stringify(details[item], null, 8)}</Text>)}
      /> : <Text>Chargement...</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
});
