export interface Academic {
    id?: string;
    degree: string;
    institution: string;
    period: {
        start: Date;
        end: Date;
        current?: boolean;
    };
    description: string;
    createdAt: Date;
    updatedAt: Date;
}