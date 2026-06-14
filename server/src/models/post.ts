import mongoose, {InferSchemaType} from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hasMembership: {
      type: Boolean,
      required: true,
    },
    note: {
      type: String,
      default: "",
      maxlength: 300,
      trim: true,
    },

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number], 
    },
    pinCode: {
      type: String,
      required: false,
      trim: true,
    },
    areaName: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending","complete"],
      default: "pending"
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    },
  },
  { timestamps: true },
);

postSchema.index({ location: "2dsphere" });
postSchema.index({ userId: 1 });
postSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


export type IPost = InferSchemaType<typeof postSchema> 
export default mongoose.model("Post", postSchema);
