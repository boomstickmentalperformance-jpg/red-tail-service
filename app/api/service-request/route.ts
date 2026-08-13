import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Customer information
    const name = formData.get("name")?.toString() || "";
    const company = formData.get("company")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const email = formData.get("email")?.toString() || "";

    // Equipment information
    const equipmentType =
      formData.get("equipmentType")?.toString() || "";

    const serviceType =
      formData.get("serviceType")?.toString() || "";

    const make = formData.get("make")?.toString() || "";
    const model = formData.get("model")?.toString() || "";
    const year = formData.get("year")?.toString() || "";
    const location = formData.get("location")?.toString() || "";

    // Description
    const description =
      formData.get("description")?.toString() || "";

    // Photos
    const photos = formData.getAll("photos");

    // Required fields
    if (
      !name ||
      !phone ||
      !email ||
      !equipmentType ||
      !serviceType ||
      !location ||
      !description
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // Prepare photo attachments
    const attachments = [];

    for (const photo of photos) {
      if (photo instanceof File && photo.size > 0) {
        const buffer = Buffer.from(await photo.arrayBuffer());

        attachments.push({
          filename: photo.name,
          content: buffer,
        });
      }
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Red Tail Service <service@redtailservice.com>",

      // Final destination
      to: ["redtailservice@gmail.com"],

      // If Dad clicks Reply, it goes directly to the customer
      replyTo: email,

      subject: `New Red Tail Service Request - ${name}`,

      html: `
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            color: #111;
            max-width: 700px;
            margin: 0 auto;
          "
        >

          <!-- Header -->
          <div
            style="
              background: #000;
              padding: 25px;
              text-align: center;
            "
          >
            <h1
              style="
                color: #fff;
                margin: 0;
                font-size: 28px;
              "
            >
              RED TAIL SERVICE
            </h1>

            <p
              style="
                color: #ef4444;
                margin: 8px 0 0;
                font-weight: bold;
                letter-spacing: 2px;
              "
            >
              NEW SERVICE REQUEST
            </p>
          </div>


          <!-- Customer Information -->
          <div style="padding: 30px 25px;">

            <h2
              style="
                border-bottom: 2px solid #dc2626;
                padding-bottom: 8px;
                margin-top: 0;
              "
            >
              Customer Information
            </h2>

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Company / Business:</strong>
              ${company || "Not provided"}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>


            <!-- Equipment Information -->
            <h2
              style="
                border-bottom: 2px solid #dc2626;
                padding-bottom: 8px;
                margin-top: 35px;
              "
            >
              Equipment Information
            </h2>

            <p>
              <strong>Equipment Type:</strong>
              ${equipmentType}
            </p>

            <p>
              <strong>Service Requested:</strong>
              ${serviceType}
            </p>

            <p>
              <strong>Make:</strong>
              ${make || "Not provided"}
            </p>

            <p>
              <strong>Model:</strong>
              ${model || "Not provided"}
            </p>

            <p>
              <strong>Year:</strong>
              ${year || "Not provided"}
            </p>

            <p>
              <strong>Equipment Location:</strong>
              ${location}
            </p>


            <!-- Description -->
            <h2
              style="
                border-bottom: 2px solid #dc2626;
                padding-bottom: 8px;
                margin-top: 35px;
              "
            >
              Problem / Service Description
            </h2>

            <div
              style="
                background: #f5f5f5;
                padding: 20px;
                border-radius: 6px;
                line-height: 1.6;
              "
            >
              ${description.replace(/\n/g, "<br />")}
            </div>


            <!-- Photos -->
            <h2
              style="
                border-bottom: 2px solid #dc2626;
                padding-bottom: 8px;
                margin-top: 35px;
              "
            >
              Photos
            </h2>

            <p>
              <strong>${attachments.length}</strong>
              photo(s) attached to this request.
            </p>


            <!-- Important Notice -->
            <div
              style="
                margin-top: 35px;
                padding: 18px;
                background: #f5f5f5;
                border-left: 4px solid #dc2626;
              "
            >

              <strong>Service Request Notice</strong>

              <p style="margin-bottom: 0;">
                This request does not guarantee service. Red Tail Service
                reviews requests individually based on the type of work,
                location, availability, and scheduling.
              </p>

            </div>

          </div>


          <!-- Footer -->
          <div
            style="
              background: #000;
              padding: 20px;
              text-align: center;
            "
          >

            <p
              style="
                color: #999;
                margin: 0;
                font-size: 12px;
              "
            >
              Red Tail Service — Oklahoma City Metro Area
            </p>

          </div>

        </div>
      `,

      // Attach customer photos to the email
      attachments:
        attachments.length > 0
          ? attachments
          : undefined,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to send service request.",
        },
        {
          status: 500,
        }
      );
    }

    console.log(
      "Red Tail service request sent successfully:",
      data
    );

    return NextResponse.json({
      success: true,
      message: "Service request sent successfully.",
    });

  } catch (error) {
    console.error("Service request error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting the request.",
      },
      {
        status: 500,
      }
    );
  }
}