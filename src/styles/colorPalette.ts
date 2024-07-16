import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --grey: rgba(58, 58, 58, 1);
    --grey20: rgba(58, 58, 58, 0.02);
    --grey50: rgba(58, 58, 58, 0.05);
    --grey100: rgba(58, 58, 58, 0.1);
    --grey200: rgba(58, 58, 58, 0.2);
    --grey300: rgba(58, 58, 58, 0.3);
    --grey400: rgba(58, 58, 58, 0.4);
    --grey500: rgba(58, 58, 58, 0.5);
    --grey600: rgba(58, 58, 58, 0.6);
    --grey700: rgba(58, 58, 58, 0.7);
    --grey800: rgba(58, 58, 58, 0.8);
    --grey900: rgba(58, 58, 58, 0.9);
    --brightgrey: rgba(239, 239, 239, 1);
    --blue: rgba(54, 143, 255, 1);
    --blue60: rgba(54, 143, 255, 0.06);
    --blue100: rgba(54, 143, 255, 0.1);
    --blue500: rgba(54, 143, 255, 0.5);
    --blue980: rgba(54, 143, 255, 0.98);
    --red: rgba(253, 46, 105, 1);
    --red100: rgba(253, 46, 105, 0.1);
    --red50: rgba(253, 46, 105, 0.05);
    --purple: rgba(151, 95, 254, 1);
    --purple100: rgba(151, 95, 254, 0.1);
    --white: rgba(255, 255, 255, 1);
    --white600: rgba(255, 255, 255, 0.6);
    --white900: rgba(255, 255, 255, 0.9);
    --black: rgba(34, 34, 34, 1);
    --teal900: rgba(10, 219, 143, 0.9);
  }
`

export const colors = {
  grey: 'var(--grey)',
  grey20: 'var(--grey20)',
  grey50: 'var(--grey50)',
  grey100: 'var(--grey100)',
  grey200: 'var(--grey200)',
  grey300: 'var(--grey300)',
  grey400: 'var(--grey400)',
  grey500: 'var(--grey500)',
  grey600: 'var(--grey600)',
  grey700: 'var(--grey700)',
  grey800: 'var(--grey800)',
  grey900: 'var(--grey900)',
  brightgrey: 'var(--brightgrey)',
  blue: 'var(--blue)',
  blue60: 'var(--blue60)',
  blue100: 'var(--blue100)',
  blue500: 'var(--blue500)',
  blue980: 'var(--blue980)',
  red: 'var(--red)',
  red100: 'var(--red100)',
  red50: 'var(--red50)',
  purple: 'var(--purple)',
  purple100: 'var(--purple100)',
  white: 'var(--white)',
  white600: 'var(--white600)',
  white900: 'var(--white900)',
  black: 'var(--black)',
  teal900: 'var(--teal900)',
}

export type Colors = keyof typeof colors
