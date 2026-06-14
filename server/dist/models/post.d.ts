import mongoose, { InferSchemaType } from "mongoose";
declare const postSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type IPost = InferSchemaType<typeof postSchema>;
declare const _default: mongoose.Model<{
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    status: "pending" | "complete";
    areaName: string;
    hasMembership: boolean;
    userId: mongoose.Types.ObjectId;
    note: string;
    expiresAt: NativeDate;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    pinCode?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=post.d.ts.map