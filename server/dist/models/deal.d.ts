import mongoose, { InferSchemaType } from 'mongoose';
declare const dealSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type IDeal = InferSchemaType<typeof dealSchema>;
declare const _default: mongoose.Model<{
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    postId: mongoose.Types.ObjectId;
    hostUserId: mongoose.Types.ObjectId;
    joinerUserId: mongoose.Types.ObjectId;
    status: "completed" | "expired" | "pending";
    meetupLocation: string;
    hostConfirmed: boolean;
    joinerConfirmed: boolean;
    meetupAt?: NativeDate | null;
    completedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=deal.d.ts.map