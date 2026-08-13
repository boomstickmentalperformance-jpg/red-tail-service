import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const beefName = formData.get("beefName")?.toString() || "";
    const beefCompany = formData.get("beefCompany")?.toString() || "";
    const beefPhone = formData.get("beefPhone")?.toString() || "";
    const beefEmail = formData.get("beefEmail")?.toString() || "";
    const beefQuantity = formData.get("beefQuantity")?.toString() || "";
    const beefTimeframe = formData.get("beefTimeframe")?.toString() || "";
    const beefExperience = formData.get("beefExperience")?.toString() || "";
    const beefMessage = formData.get("beefMessage")?.toString() || "";

    if (
      !beefName ||
      !beefPhone ||
      !beefEmail ||
      !beefQuantity ||
      !beefTimeframe ||
      !beefExperience
    ) {
      return NextResponse.json(
        {
          error: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Red Tail Service <service@redtailservice.com>",
      to: ["redtailservice@gmail.com"],
      replyTo: beefEmail,
      subject: `New Red Tail Beef Inquiry - ${beefQuantity}`,

      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 700px; margin: 0 auto; color: #111111;">

          <div style="background-color: #000000; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">
              Red Tail Beef
            </h1>

            <p style="color: #ef4444; margin: 8px 0 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
              New Beef Inquiry
            </p>
          </div>

          <div style="padding: 30px; border: 1px solid #e5e5e5;">

            <h2 style="font-size: 20px; margin-top: 0;">
              Customer Information
            </h2>

            <p>
              <strong>Name:</strong><br />
              ${beefName}
            </p>

            <p>
              <strong>Company / Business:</strong><br />
              ${beefCompany || "Not provided"}
            </p>

            <p>
              <strong>Phone:</strong><br />
              ${beefPhone}
            </p>

            <p>
              <strong>Email:</strong><br />
              ${beefEmail}
            </p>

            <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 25px 0;" />

            <h2 style="font-size: 20px;">
              Beef Details
            </h2>

            <p>
              <strong>Amount of Beef:</strong><br />
              ${beefQuantity}
            </p>

            <p>
              <strong>Purchase Timeframe:</strong><br />
              ${beefTimeframe}
            </p>

            <p>
              <strong>Previous Whole / Half Beef Experience:</strong><br />
              ${beefExperience}
            </p>

            <p>
              <strong>Questions / Additional Information:</strong><br />
              ${beefMessage || "No additional information provided."}
            </p>

            <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 25px 0;" />

            <p style="font-size: 13px; color: #666666;">
              This inquiry was submitted through the Red Tail Service website.
            </p>

          </div>

        </div>
      `,
    });

    if (error) {
      console.error("Resend beef inquiry error:", error);

      return NextResponse.json(
        {
          error: "Failed to send beef inquiry.",
        },
        { status: 500 }
      );
    }

    console.log("Red Tail beef inquiry sent successfully:", data);

    return NextResponse.json(
      {
        success: true,
        message: "Beef inquiry submitted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Beef inquiry error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while submitting the beef inquiry.",
      },
      { status: 500 }
    );
  }
}