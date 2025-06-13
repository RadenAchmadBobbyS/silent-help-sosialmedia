import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useMutation, gql } from '@apollo/client';

const CREATE_HELP_REPORT = gql`
  mutation CreateHelpReport($input: CreateHelpInput!) {
    createHelpReport(input: $input) {
      _id
      status
      riskLevel
      message
      audioUrl
      createdAt
    }
  }
`;

const AUTO_MESSAGE = 'Permintaan bantuan otomatis (triple tap)';
const AUTO_RISK_LEVEL = 'high';
const AUTO_STATUS = 'pending';
const AUTO_AUDIO_URL = 'audio-from-device-or-empty'; 

export default function RequestHelpScreen() {
  const [createHelpReport] = useMutation(CREATE_HELP_REPORT);
  const lastTap = useRef(0);
  const tapCount = useRef(0);
  const [sending, setSending] = useState(false);

  const handleTripleTap = async () => {
    setSending(true);
    try {
      // Ambil lokasi
      let { status } = await Location.requestForegroundPermissionsAsync();
      let location = null;
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        location = { lat: loc.coords.latitude, lng: loc.coords.longitude };
      }
      // Kirim mutation
      await createHelpReport({
        variables: {
          input: {
            triggerType: 'triple_tap',
            message: AUTO_MESSAGE,
            riskLevel: AUTO_RISK_LEVEL,
            status: AUTO_STATUS,
            audioUrl: AUTO_AUDIO_URL,
            location,
            deviceInfo: 'ReactNative',
          },
        },
      });
      Alert.alert('Sukses', 'Permintaan bantuan terkirim!');
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
    setSending(false);
  };

  const onScreenPress = () => {
    const now = Date.now();
    if (now - lastTap.current < 400) {
      tapCount.current += 1;
      if (tapCount.current === 3) {
        tapCount.current = 0;
        handleTripleTap();
      }
    } else {
      tapCount.current = 1;
    }
    lastTap.current = now;
  };

  return (
    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onScreenPress} disabled={sending}>
      <View>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          Ketuk layar 3x cepat untuk mengirim permintaan bantuan otomatis.
        </Text>
        {sending && <Text style={{ color: 'red', marginTop: 10 }}>Mengirim...</Text>}
      </View>
    </TouchableOpacity>
  );
}
