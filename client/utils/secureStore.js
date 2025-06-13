import * as SecureStore from 'expo-secure-store';

export async function saveSecure(key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log('Data Stored', value);
    return 'success';
}

export async function getSecure(key) {
    const result = await SecureStore.getItemAsync(key);
    return result;
}

export async function deleteSecure(key) {
    await SecureStore.deleteItemAsync(key);
    console.log('Data deleted');
    return 'success'
}