import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/splash-icon.png')} style={styles.logo} />
            <Text style={styles.title}>Silent Help</Text>
            <Text style={styles.subtitle}>Aman, Cepat, dan Mudah Minta Bantuan</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonOutlineText}>Register</Text>
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
    logo: {
        width: 100,
        height: 100,
        marginBottom: 32,
        borderRadius: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        width: 220,
        height: 48,
        backgroundColor: '#007bff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonOutline: {
        width: 220,
        height: 48,
        borderColor: '#007bff',
        borderWidth: 2,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonOutlineText: {
        color: '#007bff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});