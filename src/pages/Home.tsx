import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';

import { getPlayers } from '../services/api/stats';
import { Player, MainStackParamList } from '../../types';
import PlayerLine from '../components/PlayerLine';
import getPosition from '../utils';
import colors from '../../assets/colors';

interface HomeProps {
  navigation: StackNavigationProp<MainStackParamList>
}

export default function Home({ navigation }: HomeProps) {
  let [ basePlayers, setBasePlayers ] = useState<Array<Player>>([]);
  let [ players, setPlayers ] = useState<Array<Player>>([]);
  let [ loading, setLoading ] = useState(true);
  let [ filter, setFilter ] = useState('');

  const fetchPlayers = async () => {
    try {
      let result = await getPlayers('2', '2019');
      result = result
        .map(p => ({ ...p, firstname: p.firstname || '' }))
        .sort((a, b) => a.lastname.localeCompare(b.lastname));
      setBasePlayers(result);
      setPlayers(result);
    } catch (err) {
      console.error('Error fetching players', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    const f = filter.toLowerCase();
    const filteredPlayers = basePlayers.filter((p) => (
      p.firstname.toLowerCase().includes(f) || p.lastname.toLowerCase().includes(f) || getPosition(p.ultraPosition).toLowerCase().includes(f)
    ))
    console.log(filteredPlayers)
    setPlayers(filteredPlayers);
  }, [ filter, basePlayers ]);

  const renderPlayer = ({ item }: { item: Player }) => (<PlayerLine player={item} navigation={navigation} />);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons name='ios-search' size={20} color={colors.black} style={{ marginLeft: '5%' }}/>
        <TextInput
          style={styles.search}
          placeholder='Filtrer...'
          value={filter}
          onChangeText={(t) => setFilter(t)}
          returnKeyType='done'
        />
      </View>
      {loading ? <Text style={{ fontSize: 18 }}>Chargement...</Text> : <FlatList<Player>
        style={styles.list}
        keyExtractor={(item) => (item.id)}
        data={players}
        renderItem={renderPlayer}
      />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  search: {
    padding: 20,
    fontSize: 18,
    width: '80%',
  },
  list: {
    width: '100%'
  }
});
