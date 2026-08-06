import { twMerge } from "tailwind-merge";

type ClassValue = string | false | null | undefined | ClassValue[];

function flatten(inputs: ClassValue[]): string[] {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) out.push(...flatten(input));
    else out.push(input);
  }
  return out;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(flatten(inputs).join(" "));
}
