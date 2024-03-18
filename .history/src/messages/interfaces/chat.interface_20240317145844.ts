import { Document } from "mongoose";

export interface IChat extends Document {
    uuid: S
    
      name: {
        type: String,
        required: true,
      },
    
      isGroupChat: {
        type: Boolean,
        default: false,
      },
    
      lastMessage: {
        type: String,
      },
    
      participants: {
        type: [String],
      },
    
      admin: {
        type: String,
      },
}