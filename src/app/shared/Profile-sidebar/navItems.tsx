import {
  User,
  ShieldCheck,
  Bell,
  CreditCard,
  Cpu,
  Key,
  FileText,
  LifeBuoy,
} from "lucide-react";
import { JSX } from "react";

// Allowed tabs
export type TabType =
  | "my-profile"
  | "security"
  | "notifications"
  | "billing"
  | "integrations"
  | "api-keys"
  | "logs"
  | "support";

// Type for sidebar nav items
interface NavItem {
  key: TabType;
  label: string;
  icon: JSX.Element;
}

export const navItems: NavItem[] = [
  { key: "my-profile", label: "My Profile", icon: <User size={20} /> },
  {
    key: "security",
    label: "Login & Security",
    icon: <ShieldCheck size={20} />,
  },
  { key: "notifications", label: "Notifications", icon: <Bell size={20} /> },
  // Added more items to demonstrate scrolling capabilities
  { key: "billing", label: "Billing & Plans", icon: <CreditCard size={20} /> },
  { key: "integrations", label: "Integrations", icon: <Cpu size={20} /> },
  { key: "api-keys", label: "API Keys", icon: <Key size={20} /> },
  { key: "logs", label: "Activity Logs", icon: <FileText size={20} /> },
  { key: "support", label: "Support", icon: <LifeBuoy size={20} /> },
];
