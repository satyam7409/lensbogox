import mongoose, { InferSchemaType } from 'mongoose';
declare const messageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type IMessage = InferSchemaType<typeof messageSchema>;
declare const _default: mongoose.Model<{
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    dealId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=message.d.ts.map