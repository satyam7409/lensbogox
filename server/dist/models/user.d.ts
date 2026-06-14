import mongoose, { InferSchemaType } from "mongoose";
declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type IUser = InferSchemaType<typeof userSchema>;
declare const _default: mongoose.Model<{
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    firebaseUid: string;
    displayName: string;
    phone: string;
    avatarInitials: string;
    pinCode: string;
    areaName: string;
    hasMembership: boolean;
    isActive: boolean;
    location?: {
        type: "Point";
        coordinates: number[];
    } | null;
    lastSeenAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=user.d.ts.map