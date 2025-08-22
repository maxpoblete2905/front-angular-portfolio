import { Timestamp } from "firebase/firestore";

export interface Academic {
    id?: string;
    degree: string;
    institution: string;
    period: {
        start: Date | Timestamp;
        end: Date | Timestamp;
        current?: boolean;
    };
    description: string;
    createdAt: Date | Timestamp;
    updatedAt: Date | Timestamp;
}
