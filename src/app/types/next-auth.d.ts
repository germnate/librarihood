import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        pocketbaseToken?: string;
        user: {
            id: string
            name?: string | null | undefined;
            email?: string | null | undefined;
            image?: string | null | undefined;
        }
    }
}
