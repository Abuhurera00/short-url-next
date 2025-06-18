import { NextResponse } from 'next/server';

// models and controllers
import dbConnect from '../../../../lib/mongoose/dbConnect';
import URL from '../../../../lib/models/url.model';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  const { shortId } = await params;
  await dbConnect();
  const entry = await URL.findOne({ shortId });
  if (!entry) {
    return NextResponse.json({ success: false, message: 'Not a valid URL' }, { status: 404 });
  }
  return NextResponse.json({
    success: true,
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}