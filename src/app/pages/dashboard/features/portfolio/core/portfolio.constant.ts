import { lucideCircle, lucideDrill, lucideInfo, lucideLibraryBig, lucideToolCase, lucideUserCircle } from "@ng-icons/lucide";

export const PORTFOLIO_ICONS: Record<string, string> = {
  lucideInfo,
  lucideToolCase,
  lucideLibraryBig,
  lucideDrill,
  lucideUserCircle
};

export const PORTFOLIO_CONTROLS: Record<string, string>[] = [
  {"sectionName": "Profile", "iconName": "lucideUserCircle", "sectionCounter": "pofile"},
  {"sectionName": "Projects", "iconName": "lucideDrill", "sectionCounter": "pjCount"},
  {"sectionName": "Skills", "iconName": "lucideToolCase", "sectionCounter": "expCount"},
  {"sectionName": "Experiences", "iconName": "lucideLibraryBig", "sectionCounter":"techCount"},
]
