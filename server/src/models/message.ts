import mongoose, { InferSchemaType } from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    dealId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Deal',
      required: true,
    },
    senderId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    content: {
      type:     String,
      required: true,
      trim:     true,
      maxlength: 1000,
    },

    isRead: {
      type:    Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// every chat query is: "give me all messages for this deal, oldest first"
messageSchema.index({ dealId: 1, createdAt: 1 })
// unread count query: messages in this deal NOT sent by me that are unread
messageSchema.index({ dealId: 1, senderId: 1, isRead: 1 })

export type IMessage = InferSchemaType<typeof messageSchema>
export default mongoose.model('Message', messageSchema)