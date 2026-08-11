/**
 * Resolves the icon keys used in src/content/ to lucide components.
 *
 * Same reason as asset-map.ts: the content layer must stay importable under
 * plain Node, so it names icons by string rather than importing them.
 */
import {
  ArrowUpRight,
  Award,
  Bot,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Compass,
  FileText,
  Home,
  Layers,
  Linkedin,
  Mail,
  Mic,
  Rocket,
  Target,
  TrendingUp,
  Users,
  Video,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  'arrow-up-right': ArrowUpRight,
  award: Award,
  bot: Bot,
  'book-open': BookOpen,
  briefcase: Briefcase,
  'building-2': Building2,
  calendar: Calendar,
  compass: Compass,
  'file-text': FileText,
  home: Home,
  layers: Layers,
  linkedin: Linkedin,
  mail: Mail,
  mic: Mic,
  rocket: Rocket,
  target: Target,
  'trending-up': TrendingUp,
  users: Users,
  video: Video,
  wrench: Wrench,
};

/** Look up a content icon key. Falls back to a neutral icon. */
export const icon = (key: string): LucideIcon => icons[key] ?? FileText;
