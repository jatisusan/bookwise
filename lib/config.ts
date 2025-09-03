const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
    emailjs: {
      serviceId: process.env.EMAILJS_SERVICE_ID!,
      templateId: process.env.EMAILJS_TEMPLATE_ID!,
      publicKey: process.env.EMAILJS_PUBLIC_KEY!,
    },
    sendGrid:{
      apiKey: process.env.SENDGRID_API_KEY!,
      fromEmail: process.env.SENDGRID_FROM_EMAIL!,
    },
  },
};

export default config;