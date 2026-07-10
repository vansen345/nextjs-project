export interface IReply {
    _id?: string;
    FO100?: number;
    NV106?: string;
    NV126?: string;
    comment?: string;
    createdAt?: Date;
}

export interface IComment {
    _id?: string;
    PP300?: number;
    comment?: string;
    FO100?: number;
    NV106?: string;
    NV126?: string;
    createdAt?: Date;
    reply?: IReply[];
}