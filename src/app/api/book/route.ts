import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAILS = process.env.NOTIFY_EMAILS || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { branchSlug, customerName, customerPhone, customerEmail, date, time, guestCount } = body;

    if (!branchSlug || !customerName || !customerPhone || !date || !time || !guestCount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const guests = Number(guestCount);
    if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
      return NextResponse.json({ error: "Guest count must be between 1 and 20" }, { status: 400 });
    }

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      return NextResponse.json({ error: "Invalid time format" }, { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(new Date(date).getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const branch = branchSlug.charAt(0).toUpperCase() + branchSlug.slice(1);

    if (resend && NOTIFY_EMAILS) {
      const emails = NOTIFY_EMAILS.split(",").map((e: string) => e.trim()).filter(Boolean);
      if (emails.length > 0) {
        await resend.emails.send({
          from: "Turquaz Bookings <onboarding@resend.dev>",
          to: emails,
          subject: `New Booking: ${customerName} — ${branch} (${date} ${time})`,
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #0a1f0a; color: #faf8f5; border-radius: 12px;">
              <h2 style="color: #22c55e; margin: 0 0 16px;">New Online Booking</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #7a9e7a; width: 100px;">Branch</td><td style="padding: 8px 0; color: #faf8f5;">${branch}</td></tr>
                <tr><td style="padding: 8px 0; color: #7a9e7a;">Name</td><td style="padding: 8px 0; color: #faf8f5;">${customerName}</td></tr>
                <tr><td style="padding: 8px 0; color: #7a9e7a;">Phone</td><td style="padding: 8px 0; color: #faf8f5;"><a href="tel:${customerPhone}" style="color: #22c55e;">${customerPhone}</a></td></tr>
                ${customerEmail ? `<tr><td style="padding: 8px 0; color: #7a9e7a;">Email</td><td style="padding: 8px 0; color: #faf8f5;">${customerEmail}</td></tr>` : ""}
                <tr><td style="padding: 8px 0; color: #7a9e7a;">Date</td><td style="padding: 8px 0; color: #faf8f5;">${date}</td></tr>
                <tr><td style="padding: 8px 0; color: #7a9e7a;">Time</td><td style="padding: 8px 0; color: #faf8f5;">${time}</td></tr>
                <tr><td style="padding: 8px 0; color: #7a9e7a;">Guests</td><td style="padding: 8px 0; color: #faf8f5;">${guests}</td></tr>
              </table>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}
