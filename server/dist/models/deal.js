import mongoose from 'mongoose';
const dealSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    hostUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    joinerUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ["completed", "expired", "pending"],
        default: "pending"
    },
    meetupAt: {
        type: Date,
        default: null,
    },
    meetupLocation: {
        type: String,
        default: '',
        trim: true,
    },
    hostConfirmed: {
        type: Boolean,
        default: false,
    },
    joinerConfirmed: {
        type: Boolean,
        default: false,
    },
    // framePrice: {
    //   type:    Number,
    //   default: 0,
    // },
    // savingsEach: {
    //   type:    Number,
    //   default: 0,
    // },
    completedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
dealSchema.index({ postId: 1, joinerUserId: 1 }, { unique: true });
export default mongoose.model('Deal', dealSchema);
//# sourceMappingURL=deal.js.map