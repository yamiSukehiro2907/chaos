import type { ProfilePictureProps } from "@/types/ProfilePictureProps";
import { useState } from "react";

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src,
  name,
  size = "md",
  className = "",
  showOnlineIndicator = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (fullName: string): string => {
    if (!fullName) return "??";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24 sm:w-32 sm:h-32",
    xl: "w-32 h-32 sm:w-40 sm:h-40",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl sm:text-3xl",
    xl: "text-3xl sm:text-4xl",
  };

  const indicatorSizes = {
    sm: "w-2 h-2 bottom-0 right-0",
    md: "w-3 h-3 bottom-0 right-0",
    lg: "w-6 h-6 bottom-2 right-2",
    xl: "w-8 h-8 bottom-2 right-2",
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white shadow-lg`}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
            <span className={`font-bold text-white ${textSizes[size]}`}>
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>

      {showOnlineIndicator && (
        <div
          className={`absolute ${indicatorSizes[size]} bg-green-500 border-2 border-white rounded-full`}
        ></div>
      )}
    </div>
  );
};
