import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const slugify = (text: string | undefined) => {
  if (text) {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and") // Replace & with ‘and’
      .replace(/\s+/g, "-")
      .replace(/[^\w\\-]+/g, "")
      .replace(/\\-\\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
};

export const links = [
  { href: "/about/", label: "About" },
  { href: "/projects/", label: "Projects" },
  { href: "/experience/", label: "Experience" },
  { href: "/contact/", label: "Contact" },
];

export const capitalizeFirstLetter = (string: string) => {
  if (string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};
