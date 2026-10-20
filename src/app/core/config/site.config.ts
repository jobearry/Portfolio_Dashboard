export interface ProfileConfig {
  readonly name: string;
  readonly handle: string;
  readonly role: string;
  readonly bio: string;
}

export interface LinkConfig {
  readonly github: string;
  readonly cv: string;
}

export interface AssetConfig {
  readonly sidebarAvatar: string;
  readonly profileAvatar: string;
}

export interface NotionConfig {
  readonly pageId: string;
  readonly publicDomain: string;
}

export interface SiteConfig {
  readonly profile: ProfileConfig;
  readonly links: LinkConfig;
  readonly assets: AssetConfig;
  readonly notion: NotionConfig;
}

/**
 * Single source of truth for personal content and public integrations.
 * Paths are root-relative and served from `public/`.
 */
export const site = {
  profile: {
    name: 'Jonathan Golimlim',
    handle: '@jthan',
    role: 'Software Engineer',
    bio: 'A full-stack software engineer who specializes on developing web applications through Angular and .NET',
  },
  links: {
    github: 'https://github.com/jobearry',
    cv: 'https://drive.google.com/uc?export=download&id=1FpztsStY7V_zDvG7eFdnDUVWaRZoWcBc',
  },
  assets: {
    sidebarAvatar: 'grad_1.jpeg',
    profileAvatar: 'jg-profile.png',
  },
  notion: {
    pageId: '16348b6ae5dd8032b137c4327f9ab77c',
    publicDomain: 'glamorous-monitor-0b1.notion.site',
  },
} as const satisfies SiteConfig;
