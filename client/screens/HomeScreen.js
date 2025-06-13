import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/splash-icon.png')} style={styles.logo} />
      <Text style={styles.title}>Silent Help</Text>
      <Text style={styles.subtitle}>Selamat datang di aplikasi bantuan darurat.
Tekan tab Request Help untuk meminta bantuan secara cepat dan aman.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 26,
  },
});
