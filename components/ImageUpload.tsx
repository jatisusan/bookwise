"use client";

import config from "@/lib/config";
import { Image, ImageKitProvider, upload } from "@imagekit/next";
import { useRef, useState } from "react";
import { toast } from "sonner";

const {
  env: {
    imagekit: { urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    // Perform the request to the upload authentication endpoint.
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);
    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and destructure the response JSON for upload credentials.
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    // Log the original error for debugging before rethrowing a new error.
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const selectedFile = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file: selectedFile,
        fileName: selectedFile.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });
      if (uploadResponse.url && uploadResponse.filePath) {
        setFile({ filePath: uploadResponse.filePath });
        onFileChange(uploadResponse.filePath);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
      />
      {/* Button to trigger the upload process */}
      <button
        type="button"
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          // @ts-ignore
          if (fileInputRef.current) fileInputRef.current.click();
        }}
      >
        <img
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={"text-base"}>Upload</p>

        {file && <p className={"upload-filename"}>{file.filePath}</p>}
      </button>

      {progress > 0 && progress < 100 && (
        <progress value={progress} max={100}></progress>
      )}

      {file && (
        <Image
          alt={file.filePath}
          src={file.filePath}
          transformation={[{ width: 500, height: 300 }]}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
