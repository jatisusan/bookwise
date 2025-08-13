import config from "@/lib/config";
import { getUploadAuthParams } from "@imagekit/next/server";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { urlEndpoint, privateKey, publicKey },
  },
} = config;

// const imageKit = new ImageKit({ publicKey, privateKey, urlEndpoint });

// export async function GET() {
//   return NextResponse.json(imageKit.getAuthenticationParameters());
// }

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: privateKey as string,
    publicKey: publicKey as string,
  });

  return NextResponse.json({ token, expire, signature, publicKey });
}
