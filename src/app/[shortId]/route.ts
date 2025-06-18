import { NextResponse } from 'next/server';

// models and controllers
import dbConnect from '../../lib/mongoose/dbConnect';
import URL from '../../lib/models/url.model';

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ shortId: string }> }
) {
    const { shortId } = await params;
    await dbConnect();
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: false }
    );
    if (!entry) {
        return NextResponse.json({ success: false, message: 'Not a valid URL' }, { status: 400 });
    }
    return NextResponse.redirect(entry.redirectURL);
}