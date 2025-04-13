export interface Certification {
    id?: string;
    title: string;
    institution: string;
    issueDate: Date;
    expirationDate?: Date;
    credentialId?: string;
    credentialUrl?: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}