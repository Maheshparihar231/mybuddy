// secureStoreService.ts
import * as SecureStore from 'expo-secure-store';

// Save user credentials
export async function saveCredentials(userId: string, email: string) {
    try {
        await SecureStore.setItemAsync('userId', userId);
        await SecureStore.setItemAsync('email', email);
        console.log('Credentials saved.');
    } catch (error) {
        console.log('Error saving credentials:', error);
    }
}

// Get stored credentials
export async function getCredentials() {
    try {
        const userId = await SecureStore.getItemAsync('userId');
        const email = await SecureStore.getItemAsync('email');
        return { userId, email };
    } catch (error) {
        console.log('Error retrieving credentials:', error);
        return null;
    }
}

// Delete credentials
export async function deleteCredentials() {
    try {
        await SecureStore.deleteItemAsync('userId');
        await SecureStore.deleteItemAsync('email');
        console.log('Credentials deleted.');
    } catch (error) {
        console.log('Error deleting credentials:', error);
    }
}
