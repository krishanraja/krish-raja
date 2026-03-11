

# Fix Dark Mode Logos + Remove "Fractional" from Hero

## Changes

### 1. Dark mode logo fix for Techonomic and Signal & Noise (`src/components/LivePortfolio.tsx`)
The screenshot shows these two logos are nearly invisible in dark mode. The current dark mode treatment (`dark:brightness-110 dark:contrast-105`) isn't enough for these darker logos. Add stronger brightness/invert filters specifically for these two logos.

In the `BusinessCard` component, add a conditional class for these logos: `dark:brightness-150 dark:invert` (or similar) when `isLargerLogo` is true, since that flag already identifies Techonomic and Signal & Noise.

### 2. Remove "fractional" from Hero subtitle (`src/components/Hero.tsx`)
Line 19 currently reads: "...help humans and businesses use data + AI to become self-reliant, fractional, and value-creating."

Change to: "...help humans and businesses use data + AI to become self-reliant and value-creating."

