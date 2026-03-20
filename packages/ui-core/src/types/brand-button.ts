export type BrandProvider =
  // Social & Auth
  | 'google' | 'facebook' | 'apple' | 'microsoft' | 'github' | 'gitlab'
  | 'twitter' | 'x' | 'discord' | 'slack' | 'linkedin' | 'reddit'
  // Media
  | 'twitch' | 'youtube' | 'tiktok' | 'instagram' | 'snapchat' | 'pinterest' | 'spotify'
  // Streaming TV
  | 'netflix' | 'disneyplus' | 'hbo' | 'primeVideo' | 'appletv' | 'crunchyroll'
  // Gaming
  | 'steam' | 'playstation' | 'xbox' | 'nintendo' | 'epicgames'
  // Tech & Business
  | 'stripe' | 'paypal' | 'amazon' | 'figma' | 'notion' | 'vercel' | 'netlify'

export type BrandButtonVariant = 'solid' | 'outline' | 'light'
