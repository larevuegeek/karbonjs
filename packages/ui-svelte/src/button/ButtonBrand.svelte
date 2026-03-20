<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { BrandProvider, BrandButtonVariant } from '@karbonjs/ui-core'
  import type { ButtonSize, ButtonShape } from '@karbonjs/ui-core'
  import * as si from 'simple-icons'

  interface Props {
    brand: BrandProvider
    variant?: BrandButtonVariant
    size?: ButtonSize
    shape?: ButtonShape
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?: boolean
    loadingText?: string
    fullWidth?: boolean
    iconOnly?: boolean
    class?: string
    classes?: { root?: string }
    onclick?: () => void
    children?: Snippet
  }

  let {
    brand,
    variant = 'solid',
    size = 'md',
    shape = 'rounded',
    type = 'button',
    disabled = false,
    loading = false,
    loadingText = '',
    fullWidth = false,
    iconOnly = false,
    class: className = '',
    classes = {},
    onclick,
    children
  }: Props = $props()

  const isDisabled = $derived(disabled || loading)

  // Map brand names to simple-icons slugs (only those that exist)
  const slugMap: Record<string, string> = {
    google: 'siGoogle', facebook: 'siFacebook', apple: 'siApple',
    github: 'siGithub', gitlab: 'siGitlab', x: 'siX',
    discord: 'siDiscord', reddit: 'siReddit',
    twitch: 'siTwitch', youtube: 'siYoutube', tiktok: 'siTiktok',
    instagram: 'siInstagram', snapchat: 'siSnapchat', pinterest: 'siPinterest',
    spotify: 'siSpotify', netflix: 'siNetflix', hbo: 'siHbomax',
    appletv: 'siAppletv', crunchyroll: 'siCrunchyroll',
    steam: 'siSteam', playstation: 'siPlaystation', epicgames: 'siEpicgames',
    stripe: 'siStripe', paypal: 'siPaypal',
    figma: 'siFigma', notion: 'siNotion', vercel: 'siVercel', netlify: 'siNetlify',
  }

  // Fallback SVGs for brands not in simple-icons (24x24 viewBox)
  const fallbackSvg: Record<string, string> = {
    microsoft: '<rect x="1" y="1" width="10" height="10"/><rect x="13" y="1" width="10" height="10"/><rect x="1" y="13" width="10" height="10"/><rect x="13" y="13" width="10" height="10"/>',
    twitter: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    slack: '<path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>',
    linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
    disneyplus: '<path d="M1.57 8.793c-.192.14-.257.372-.115.588.167.253.488.318.717.14l6.946-5.126c.192-.14.245-.372.091-.588a.52.52 0 0 0-.142-.152.46.46 0 0 0-.575.012zm16.09 2.184c-.68-1.167-1.698-2.146-2.98-2.87-.744-.42-1.565-.742-2.438-.965l1.14-.825c.77-.557 1.052-1.42.68-2.082-.384-.662-1.321-.84-2.091-.283L2.505 10.88c-.77.558-1.052 1.421-.668 2.082.372.65 1.321.84 2.091.283l3.7-2.677c.744.15 1.437.396 2.065.72 1.744.906 2.864 2.478 2.864 4.205 0 2.735-2.812 4.944-6.275 4.944-1.18 0-2.297-.269-3.206-.751a.447.447 0 0 0-.614.163.464.464 0 0 0 .16.63c1.053.558 2.338.87 3.66.87 4.044 0 7.165-2.644 7.165-5.856 0-1.61-.82-3.09-2.184-4.212l2.132-1.543c.128-.093.2-.258.128-.395a.23.23 0 0 0-.064-.082z"/><circle cx="21.5" cy="8.5" r="1.5"/>',
    primeVideo: '<path d="M1.285 11.953C.41 11.665 0 11.143 0 10.445c0-.476.182-.894.545-1.256.364-.362.79-.543 1.28-.543.42 0 .79.13 1.107.39.318.26.554.63.71 1.108l-1.003.38c-.076-.293-.19-.507-.34-.643a.73.73 0 0 0-.498-.203.783.783 0 0 0-.56.227.757.757 0 0 0-.235.564c0 .372.236.665.708.879zm4.638-2.558L8.17 9.22c-.158-.39-.37-.675-.635-.857a1.501 1.501 0 0 0-.88-.273c-.56 0-1.03.21-1.413.627-.384.419-.575.94-.575 1.563 0 .614.188 1.124.563 1.53.375.406.847.61 1.416.61.36 0 .672-.1.937-.297.265-.198.48-.5.645-.91l-2.23-.173.15-.886h3.38l-.006.115c-.058.846-.34 1.534-.845 2.063-.505.53-1.15.794-1.935.794-.866 0-1.582-.3-2.148-.9-.566-.6-.85-1.366-.85-2.299 0-.95.295-1.73.884-2.342.589-.611 1.327-.917 2.214-.917.646 0 1.2.166 1.665.498.464.332.8.81 1.007 1.434z" transform="translate(4 2) scale(1.2)"/>',
    amazon: '<path d="M.045 18.02c.072-.116.187-.124.348-.024 2.862 1.773 6.093 2.66 9.693 2.66 2.602 0 5.145-.588 7.63-1.764.366-.173.674-.244.92-.211.246.032.373.171.381.415.007.244-.105.46-.337.647-.232.187-.586.424-1.062.71a16.87 16.87 0 0 1-2.742 1.279 16.76 16.76 0 0 1-5.028 1.025c-3.455.06-6.543-.88-9.262-2.822-.21-.153-.262-.308-.157-.467l.373-.448zm13.514-3.533c-.152-.195-.296-.151-.433.133-.137.284-.18.574-.13.87.05.294.207.523.47.685a9.532 9.532 0 0 0 1.768.887c1.032.39 1.69.642 1.976.755.286.113.462.183.53.21.264.1.503.122.717.062.213-.06.32-.222.32-.486v-.14c0-.41-.154-.78-.463-1.112-.31-.33-.765-.626-1.369-.886-.604-.26-1.024-.438-1.26-.534a17.86 17.86 0 0 0-2.127-.443z"/>',
    xbox: '<path d="M6.97 3.846c-.987.567-1.878 1.323-2.604 2.222C2.9 8.088 2.3 10.6 2.9 12.87c.438 1.655 1.47 3.106 2.873 4.072.182-.22 1.263-1.685 3.243-4.593 1.78-2.613 2.282-3.64 2.282-4.282 0-.415-.106-.739-.354-1.175-.622-1.094-1.79-2.156-3.098-2.838-.287-.15-.598-.29-.876-.208zM12 2.04c-1.076 0-2.122.192-3.106.547 1.524.81 2.9 2.07 3.674 3.362.33.552.514 1.106.514 1.775 0 .97-.465 2.046-2.452 4.975-1.734 2.557-2.862 4.153-3.318 4.744.66.384 1.31.59 2.128.722.684.11 1.483.066 2.142-.052 2.688-.48 4.81-2.35 5.678-4.933.737-2.193.414-4.698-.88-6.737A7.893 7.893 0 0 0 12 2.04z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.2c5.934 0 10.8 4.866 10.8 10.8S17.934 22.8 12 22.8 1.2 17.934 1.2 12 6.066 1.2 12 1.2z"/>',
    nintendo: '<path d="M5.818 0A5.818 5.818 0 0 0 0 5.818v12.364A5.818 5.818 0 0 0 5.818 24h12.364A5.818 5.818 0 0 0 24 18.182V5.818A5.818 5.818 0 0 0 18.182 0H5.818zm0 1.745h4.91v20.51h-4.91a4.073 4.073 0 0 1-4.073-4.073V5.818a4.073 4.073 0 0 1 4.073-4.073zm8.509 0h3.855a4.073 4.073 0 0 1 4.073 4.073v12.364a4.073 4.073 0 0 1-4.073 4.073h-3.855V1.745zM7.636 6.545a3.273 3.273 0 1 0 0 6.546 3.273 3.273 0 0 0 0-6.546zm0 1.746a1.527 1.527 0 1 1 0 3.054 1.527 1.527 0 0 1 0-3.054zm8.728 2.182a1.745 1.745 0 1 0 0 3.49 1.745 1.745 0 0 0 0-3.49z"/>',
  }

  // Brand metadata (label + foreground override for light-colored brands)
  const meta: Record<string, { label: string, fg?: string }> = {
    google: { label: 'Google' }, facebook: { label: 'Facebook' }, apple: { label: 'Apple' },
    microsoft: { label: 'Microsoft' }, github: { label: 'GitHub' }, gitlab: { label: 'GitLab' },
    twitter: { label: 'Twitter' }, x: { label: 'X' }, discord: { label: 'Discord' },
    slack: { label: 'Slack' }, linkedin: { label: 'LinkedIn' }, reddit: { label: 'Reddit' },
    twitch: { label: 'Twitch' }, youtube: { label: 'YouTube' }, tiktok: { label: 'TikTok' },
    instagram: { label: 'Instagram' }, snapchat: { label: 'Snapchat', fg: '#000' },
    pinterest: { label: 'Pinterest' }, spotify: { label: 'Spotify', fg: '#000' },
    netflix: { label: 'Netflix' }, disneyplus: { label: 'Disney+' }, hbo: { label: 'HBO Max' },
    primeVideo: { label: 'Prime Video' }, appletv: { label: 'Apple TV+' },
    crunchyroll: { label: 'Crunchyroll' }, steam: { label: 'Steam' },
    playstation: { label: 'PlayStation' }, xbox: { label: 'Xbox' },
    nintendo: { label: 'Nintendo' }, epicgames: { label: 'Epic Games' },
    stripe: { label: 'Stripe' }, paypal: { label: 'PayPal' },
    amazon: { label: 'Amazon', fg: '#000' }, figma: { label: 'Figma' },
    notion: { label: 'Notion' }, vercel: { label: 'Vercel' },
    netlify: { label: 'Netlify', fg: '#000' },
  }

  // Get icon data from simple-icons, fallback to custom SVG
  const icon = $derived.by(() => {
    const key = slugMap[brand]
    if (key && key in si) {
      const data = (si as any)[key] as { svg: string, hex: string, title: string }
      return { svg: data.svg, hex: data.hex, viewBox: '0 0 24 24' }
    }
    if (fallbackSvg[brand]) {
      return { svg: fallbackSvg[brand], hex: fallbackHex[brand] || '666666', viewBox: '0 0 24 24' }
    }
    return null
  })

  // Fallback hex colors for brands not in simple-icons
  const fallbackHex: Record<string, string> = {
    microsoft: '00A4EF', twitter: '1DA1F2', slack: '4A154B', linkedin: '0A66C2',
    disneyplus: '113CCF', primeVideo: '00A8E1', amazon: 'FF9900',
    xbox: '107C10', nintendo: 'E60012',
  }

  const brandLabel = $derived(meta[brand]?.label || brand)
  const brandFg = $derived(meta[brand]?.fg || 'white')

  const rawHex = $derived(icon ? `#${icon.hex}` : '#666')

  // Lighten a hex color by mixing with white
  function lighten(hex: string, amount: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const lr = Math.round(r + (255 - r) * amount)
    const lg = Math.round(g + (255 - g) * amount)
    const lb = Math.round(b + (255 - b) * amount)
    return `#${lr.toString(16).padStart(2,'0')}${lg.toString(16).padStart(2,'0')}${lb.toString(16).padStart(2,'0')}`
  }

  // Detect if brand color is too dark for dark backgrounds
  function luminance(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return 0.299 * r + 0.587 * g + 0.114 * b
  }

  const isDark = $derived(luminance(rawHex) < 0.25)
  // For dark brands: lighten the color so it's visible on dark bg
  const visibleColor = $derived(isDark ? lighten(rawHex, 0.6) : rawHex)
  // Solid bg for dark brands: slightly lighter so it pops from the page bg
  const solidBg = $derived(isDark ? lighten(rawHex, 0.15) : rawHex)
  const solidBgHover = $derived(isDark ? lighten(rawHex, 0.25) : rawHex + 'cc')

  const style = $derived.by(() => {
    switch (variant) {
      case 'solid':
        return `--kb-bg:${solidBg};--kb-bg-h:${solidBgHover};--kb-c:${brandFg};--kb-c-h:${brandFg};--kb-b:none;--kb-b-h:none`
      case 'outline':
        return `--kb-bg:transparent;--kb-bg-h:${visibleColor}15;--kb-c:${visibleColor};--kb-c-h:${visibleColor};--kb-b:1px solid ${visibleColor}40;--kb-b-h:1px solid ${visibleColor}80`
      case 'light':
        return `--kb-bg:${visibleColor}15;--kb-bg-h:${visibleColor}25;--kb-c:${visibleColor};--kb-c-h:${visibleColor};--kb-b:none;--kb-b-h:none`
      default: return ''
    }
  })

  const sizeClasses: Record<string, string> = {
    '2xs': 'px-1.5 py-0.5 text-[10px] gap-1',
    xs: 'px-2.5 py-1 text-xs gap-1.5',
    sm: 'px-3 py-1.5 text-sm gap-2',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
    xl: 'px-6 py-3 text-base gap-2.5',
    '2xl': 'px-8 py-3.5 text-lg gap-3',
    '3xl': 'px-10 py-4 text-xl gap-3',
  }

  const iconSizes: Record<string, number> = {
    '2xs': 10, xs: 12, sm: 14, md: 16, lg: 18, xl: 20, '2xl': 22, '3xl': 24,
  }

  const shapeClasses: Record<string, string> = {
    sharp: 'rounded-none',
    soft: 'rounded-md',
    rounded: 'rounded-lg',
    pill: 'rounded-full',
    circle: 'rounded-full',
  }

  const circleSizes: Record<string, string> = {
    '2xs': 'w-5 h-5', xs: 'w-7 h-7', sm: 'w-8 h-8', md: 'w-10 h-10',
    lg: 'w-12 h-12', xl: 'w-14 h-14', '2xl': 'w-16 h-16', '3xl': 'w-20 h-20',
  }
</script>

<button
  {type}
  disabled={isDisabled}
  {onclick}
  {style}
  class="
    karbon-btn
    inline-flex items-center justify-center font-semibold
    {shapeClasses[shape]}
    {shape === 'circle' && iconOnly ? circleSizes[size] : sizeClasses[size]}
    transition-all duration-200 ease-out
    cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    {fullWidth ? 'w-full' : ''}
    {classes?.root ?? className}
  "
>
  {#if loading}
    <svg xmlns="http://www.w3.org/2000/svg" width={iconSizes[size]} height={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    {#if loadingText}<span>{loadingText}</span>{/if}
  {:else}
    {#if icon}
      <svg xmlns="http://www.w3.org/2000/svg" width={iconSizes[size]} height={iconSizes[size]} viewBox={icon.viewBox} fill="currentColor" role="img" aria-label={brandLabel}>{@html icon.svg}</svg>
    {/if}
    {#if !iconOnly}
      {#if children}
        {@render children()}
      {:else}
        <span>{brandLabel}</span>
      {/if}
    {/if}
  {/if}
</button>

<style>
  .karbon-btn {
    background: var(--kb-bg);
    color: var(--kb-c);
    border: var(--kb-b);
  }
  .karbon-btn:hover:not(:disabled) {
    background: var(--kb-bg-h);
    color: var(--kb-c-h);
    border: var(--kb-b-h);
  }
  .karbon-btn:active:not(:disabled) {
    transform: scale(0.97);
  }
</style>
