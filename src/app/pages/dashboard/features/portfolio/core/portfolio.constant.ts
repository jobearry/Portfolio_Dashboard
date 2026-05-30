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
  {"sectionName": "Project", "iconName": "lucideDrill", "sectionCounter": "pjCount"},
  {"sectionName": "Skill", "iconName": "lucideToolCase", "sectionCounter": "expCount"},
  {"sectionName": "Experience", "iconName": "lucideLibraryBig", "sectionCounter":"techCount"},
]
