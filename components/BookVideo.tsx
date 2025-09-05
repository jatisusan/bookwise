import config from "@/lib/config";
import { ImageKitProvider, Video } from "@imagekit/next";
import React from "react";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
      <Video src={videoUrl} controls className="rounded-xl w-full" />
    </ImageKitProvider>
  );
};

export default BookVideo;
