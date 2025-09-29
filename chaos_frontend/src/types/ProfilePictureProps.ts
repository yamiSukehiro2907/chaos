export interface ProfilePictureProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showOnlineIndicator?: boolean;
}
