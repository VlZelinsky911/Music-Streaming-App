export const OAUTH_PROVIDERS = [
  {
    id: 'google',
    label: 'Sign in with Google',
    icon: '/google_icon.svg',
  },
  {
    id: 'discord',
    label: 'Sign in with Discord',
    icon: '/discord_icon.svg',
  },
  {
    id: 'github',
    label: 'Sign in with GitHub',
    icon: '/github_icon.svg',
  },
] as const;

export type OAuthProviderId = (typeof OAUTH_PROVIDERS)[number]['id'];
