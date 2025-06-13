import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Dummy data untuk contoh
const dummyHistory = [
  { id: '1', date: '2025-06-14', status: 'Terkirim', message: 'Permintaan bantuan di rumah.' },
  { id: '2', date: '2025-06-10', status: 'Ditangani', message: 'Permintaan bantuan di kantor.' },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Bantuan</Text>
      <FlatList
        data={dummyHistory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={[styles.status, item.status === 'Terkirim' ? styles.statusSent : styles.statusHandled]}>{item.status}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusSent: {
    backgroundColor: '#ffe066',
    color: '#856404',
  },
  statusHandled: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
});
