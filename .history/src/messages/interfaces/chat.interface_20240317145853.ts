import { Document } from "mongoose";

export interface IChat extends Document {
    uuid: string
    string
    
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