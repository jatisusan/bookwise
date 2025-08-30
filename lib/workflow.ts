import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

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
  await qstashClient.publishJSON({
    url: "https://api.emailjs.com/api/v1.0/email/send",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
      service_id: config.env.emailjs.serviceId,
      template_id: config.env.emailjs.templateId,
      user_id: config.env.emailjs.publicKey,
      template_params: {
        email,
        subject,
        message,
        title
      },
    },
  });
};
