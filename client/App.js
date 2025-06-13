import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import client from './config/apollo';
import AuthProvider from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import socket from './services/socket';
import React from 'react';

export default function App() {

    React.useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket terhubung:', socket.id);
            socket.emit('ping');
        });
        socket.on('pong', () => {
            console.log('Pong diterima dari server');
        });
        return () => {
            socket.off('connect');
            socket.off('pong');
        };
    }, []);

    return (
        <AuthProvider>
            <ApolloProvider client={client}>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </ApolloProvider>
        </AuthProvider>
    );
}