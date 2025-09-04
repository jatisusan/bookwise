"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { Image, ImageKitProvider, upload, Video } from "@imagekit/next";
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

interface Props {
  onFileChange: (filePath: string) => void;
  type: "image" | "video";
  placeholder: string;
  accept: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
}

const FileUpload = ({
  onFileChange,
  type,
  placeholder,
  accept,
  folder,
  variant,
  value
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<string | null>(value ?? null );

  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border border-gray-100",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const validator = (file: File) => {
    // Validate file type using accept prop
    if (accept) {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const isTypeValid = acceptedTypes.some(
        (type) =>
          type === file.type ||
          (type.endsWith("/*") &&
            file.type.startsWith(type.split("/")[0] + "/"))
      );
      if (!isTypeValid) {
        toast.error(`Invalid file type. Allowed: ${accept}`);
        return false;
      }
    }

    // Validate file size
    if (type === "image") {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size should be less than 10MB");
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Video size should be less than 50MB");
        return false;
      }
    }
    return true;
  };

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const selectedFile = fileInput.files[0];

    // Validate file size
    if (!validator(selectedFile)) return;

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
        folder,
        useUniqueFileName: true,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });
      if (uploadResponse.url && uploadResponse.filePath) {
        setFile(uploadResponse.filePath);
        onFileChange(uploadResponse.filePath);
        toast.success(`${type} uploaded successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${type} upload failed`);
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
        className={cn("upload-btn", styles.button)}
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

        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn("upload-filename", styles.text)}>{file}</p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <Image
            alt={file}
            src={file}
            transformation={[{ width: 100, height: 300 }]}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <Video
            src={file}
            controls
            className="w-full h-96 rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
