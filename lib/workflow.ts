import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";
import sgMail from "@sendgrid/mail";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

// const qstashClient = new QStashClient({
//   token: config.env.upstash.qstashToken,
// });

sgMail.setApiKey(config.env.sendGrid.apiKey);

export const sendEmail = async ({
  name,
  email,
  subject,
  message,
  title,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  title: string;
}) => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject,
      text: message,
      html: `
            <div style="background:#111624; padding:30px; font-family:Arial, sans-serif; color:#ffffff; max-width:600px; margin:0 auto; border-radius:8px;">
              <div style="display:flex; align-items:center; gap:12px; padding-bottom:14px;">
                <img src="https://bookwise-sb.vercel.app/icons/logo.png" alt="BookWise logo" width="36" style="display:block; " />
                <div style="font-weight:700; font-size:18px; line-height:1; color:#ffffff;">BookWise</div>
              </div>
              <div style="height:1px; background:#202534; margin:0 0 18px;"></div>
              <h1 style="font-size:20px; margin:0 0 15px;">${title}</h1><br>
              <p style="font-size:15px; line-height:1.6; color:#d1d5db;">Hi ${name},<br><br>${message}<br><br></p>
              <a href="https://bookwise-sb.vercel.app" style="display:inline-block; background:#e7c9a5; color:#ffffff; font-weight:bold; padding:12px 24px; border-radius:6px; text-decoration:none; font-size:14px; margin:15px 0;">Open BookWise</a>
              <p style="font-size:14px; line-height:1.6; color:#d1d5db; margin-top:20px;">Happy reading,<br>The BookWise Team</p> 
            </div>
      `,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("SendGrid error:", error);
    throw error;
  }
};
