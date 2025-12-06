import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 1e12) {
    return `KSh ${(amount / 1e12).toFixed(2)}T`;
  }
  if (amount >= 1e9) {
    return `KSh ${(amount / 1e9).toFixed(2)}B`;
  }
  if (amount >= 1e6) {
    return `KSh ${(amount / 1e6).toFixed(2)}M`;
  }
  if (amount >= 1e3) {
    return `KSh ${(amount / 1e3).toFixed(2)}K`;
  }
  return `KSh ${amount.toFixed(2)}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-KE').format(num);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

