import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// models and controllers
import dbConnect from "../../lib/mongoose/dbConnect"
import URL from '../../lib/models/url.model';

export async function POST(req: Request) {
    const { url } = await req.json();
    if (!url) {
        return NextResponse.json({ success: false, message: 'url is required' }, { status: 400 });
    }
    await dbConnect();
    const shortId = nanoid(8);
    await URL.create({ shortId, redirectURL: url, visitHistory: [] });
    return NextResponse.json({ success: true, id: shortId });
}