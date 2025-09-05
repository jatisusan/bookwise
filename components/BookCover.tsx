"use client";

import { cn } from "@/lib/utils";
import { buildSrc, Image } from "@imagekit/next";
import BookCoverSvg from "./BookCoverSvg";
import config from "@/lib/config";
import { useState } from "react";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  variant = "regular",
  className,
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: Props) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          urlEndpoint={config.env.imagekit.urlEndpoint}
          src={coverImage}
          alt="book"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          style={
            showPlaceholder
              ? {
                  backgroundImage: `url(${buildSrc({
                    urlEndpoint: "https://ik.imagekit.io/ikmedia",
                    src: "/default-image.jpg",
                    transformation: [
                      // {}, // Any other transformation you want to apply
                      {
                        quality: 10,
                        blur: 90,
                      },
                    ],
                  })})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
          onLoad={() => {
            setShowPlaceholder(false);
          }}
        />
      </div>
    </div>
  );
};

export default BookCover;
