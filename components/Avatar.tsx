import useUser from "@/hooks/useUser";
import Router from "next/router";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder
}) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      Router.push(url);
    },
    [userId] // Add userId to the dependency array
  );

  const borderClass = hasBorder ? "border-red-500" : "border-gray-300";
  const avatarSize = isLarge ? "h-32 w-32" : "h-12 w-12";

  return (
    <div
      className={`
        ${borderClass}
        ${avatarSize}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
