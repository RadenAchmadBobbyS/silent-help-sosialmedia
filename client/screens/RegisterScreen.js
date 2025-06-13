import { useState } from "react";
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";


export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emergencyPhone, setEmergencyPhone] = useState('');

    const handleRegister = () => {
        // TODO: Integrasi ke backend
        Alert.alert('Register', 'Account created successfully!');
        navigation.navigate('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Emergency Phone"
                value={emergencyPhone}
                onChangeText={setEmergencyPhone}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#222',
    },
    input: {
        width: '100%',
        maxWidth: 350,
        height: 48,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    button: {
        width: '100%',
        maxWidth: 350,
        height: 48,
        backgroundColor: '#007bff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: '#007bff',
        fontSize: 16,
        marginTop: 8,
    },
});