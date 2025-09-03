import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";
import sgMail from "@sendgrid/mail";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

sgMail.setApiKey(config.env.sendGrid.apiKey);

export const sendEmail = async ({
  email,
  subject,
  message,
  title,
}: {
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
      html: `<h1>${title}</h1><p>${message}</p>`,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("SendGrid error:", error);
    throw error;
  }
};
