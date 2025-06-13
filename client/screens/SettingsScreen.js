import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Akun</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Ganti Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Tentang Aplikasi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item, { backgroundColor: '#ffeaea', marginTop: 32 }]}
        onPress={() => {
          /* TODO: Logout logic */
        }}>
        <Text style={[styles.itemText, { color: '#d90429' }]}>Logout</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
    alignSelf: 'center',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
