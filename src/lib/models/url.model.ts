import mongoose, { Document, Schema } from 'mongoose'


interface VisitEntry {
    timestamp: number
}


export interface UrlDocument extends Document {
    shortId: string
    redirectURL: string
    visitHistory: VisitEntry[]
    createdAt: Date
    updatedAt: Date
}


const visitSchema = new Schema<VisitEntry>({
    timestamp: { type: Number, required: true }
})


const urlSchema = new mongoose.Schema<UrlDocument>({
    shortId: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true },
    visitHistory: { type: [visitSchema], default: [] },
}, { timestamps: true })

const URL = mongoose.models.URL || mongoose.model<UrlDocument>('URL', urlSchema)

export default URL
