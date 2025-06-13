import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      token
      user {
        _id
        name
        username
        email
      }
    }
  }
`;

export default function LoginScreen({ navigation }) {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [login] = useMutation(LOGIN_MUTATION);

    const handleLogin = async () => {
        setLoading(true);
        try {
            if (!usernameOrEmail || !password) {
                setLoading(false);
                Alert.alert("Error", "Please enter username/email and password");
                return;
            }
            const { data } = await login({
                variables: {
                    identifier: usernameOrEmail,
                    password: password,
                },
            });
            setLoading(false);
            if (data?.login?.token) {
                // Simpan token ke secure storage jika perlu
                Alert.alert("Login", "Login successful!");
                // navigation.replace('Home');
            } else {
                Alert.alert("Error", "Login failed");
            }
        } catch (err) {
            setLoading(false);
            Alert.alert("Error", err.message || "Login failed");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username or Email"
                value={usernameOrEmail}
                onChangeText={setUsernameOrEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
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