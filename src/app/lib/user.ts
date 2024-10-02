import pb from './db';
import { User } from '../types/user'


const getAuthenticUser = async (username: string, password: string): Promise<User | null> => {
    try {
        const res = await pb.collection('users').authWithPassword(username, password);
        const authenticatedUser: User = {
            id: res?.record.id,
            username: res?.record.username,
            email: res?.record.email,
            created: res?.record.created,
            updated: res?.record.updated,
            emailVisibility: res?.record.emailVisibility,
            verified: res?.record.verified,
        }
        return authenticatedUser;
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
}

export { getAuthenticUser }