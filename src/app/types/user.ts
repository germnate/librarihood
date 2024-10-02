interface User {
    id: string;
    username: string;
    name?: string;
    email?: string;
    avatar?: string;
    created: string;
    updated: string; 
    emailVisibility: boolean; 
    verified: boolean; 
}

export type { User }