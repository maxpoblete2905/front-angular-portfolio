export interface Contact {
    id?: string;
    name: string;
    email: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: 'pending' | 'read' | 'replied' | 'archived';
    ipAddress?: string;
    userAgent?: string;
}