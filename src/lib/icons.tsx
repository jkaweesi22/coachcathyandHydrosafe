import {
  type LucideIcon,
  Home,
  User,
  Droplets,
  BookOpen,
  Mail,
  Calendar,
  ListTodo,
  UtensilsCrossed,
  Dumbbell,
  FileText,
  ChevronRight,
  Phone,
  Sparkles,
  CheckCircle2,
  Circle,
  Copy,
  RotateCcw,
  Download,
  Upload,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  user: User,
  droplets: Droplets,
  bookOpen: BookOpen,
  mail: Mail,
  calendar: Calendar,
  listTodo: ListTodo,
  utensilsCrossed: UtensilsCrossed,
  dumbbell: Dumbbell,
  fileText: FileText,
  chevronRight: ChevronRight,
  phone: Phone,
  sparkles: Sparkles,
  checkCircle2: CheckCircle2,
  circle: Circle,
  copy: Copy,
  rotateCcw: RotateCcw,
  download: Download,
  upload: Upload,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? FileText;
}

export { iconMap };
