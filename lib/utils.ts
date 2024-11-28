/* eslint-disable */
// @ts-nocheck
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ImageUrlInfo } from "@/lib/types"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeSince(dateISO:Date) {
  const now = new Date();
  const postDate = new Date(dateISO);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

export function extractImageUrl(input: string): ImageUrlInfo {
  const regex = /\[(https?:\/\/\S+)\]/;
  const match = input.match(regex);

  if (match) {
    return {
      hasUrl: true,
      url: match[1],
      cleanString: input.replace(match[0], '').trim()
    };
  } else {
    return {
      hasUrl: false,
      url: null,
      cleanString: input.trim()
    };
  }
}
