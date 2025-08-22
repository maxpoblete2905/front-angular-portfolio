import { Timestamp } from "firebase/firestore";

export interface Certification {
    id?: string;
    title: string;
    institution: string;
    issueDate: Date | Timestamp;
    expirationDate?: Date | Timestamp;
    credentialId?: string;
    credentialUrl?: string;
    imageUrl: string;
    createdAt?: Date | Timestamp;
    updatedAt?: Date | Timestamp;
}
