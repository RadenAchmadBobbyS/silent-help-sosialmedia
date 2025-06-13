import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import RequestHelpScreen from '../screens/RequestHelpScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function AppNavigator() {
    const { isSignedIn } = useContext(AuthContext);

    // Bottom Tab Navigator after sign in
    function BottomTabNavigator() {
        return (
            <BottomTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') iconName = 'home';
                        else if (route.name === 'RequestHelp') iconName = 'alert-circle';
                        else if (route.name === 'History') iconName = 'time';
                        else if (route.name === 'Settings') iconName = 'settings';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#007bff',
                    tabBarInactiveTintColor: '#888',
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        height: 64,
                        paddingBottom: 8,
                        shadowColor: '#000',
                        shadowOpacity: 0.08,
                        shadowOffset: { width: 0, height: -2 },
                        shadowRadius: 8,
                        elevation: 8,
                    },
                    headerShown: false,
                })}
            >
                <BottomTab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                <BottomTab.Screen name="RequestHelp" component={RequestHelpScreen} options={{ title: 'Request Help' }} />
                <BottomTab.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
                <BottomTab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
            </BottomTab.Navigator>
        )
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { fontWeight: 'bold' },
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerShown: true,
            }}
        >
            {!isSignedIn ? (
                <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
                </>
            )}

        </Stack.Navigator>
    )
}