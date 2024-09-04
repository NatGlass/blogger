import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User2 } from "lucide-react";

interface UserAvatarProps {
  imageUrl?: string | null | undefined;
  size?: number;
  className?: string;
}

function UserAvatar({ imageUrl, size, className }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage
        src={imageUrl || undefined}
        alt="User avatar"
        width={size ?? 40}
        height={size ?? 40}
        className={cn(
          "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
          className
        )}
      />
      <AvatarFallback className="text-sm">
        <User2 className="size-5 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
