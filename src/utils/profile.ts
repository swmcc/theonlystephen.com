import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export interface Experience {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
  previous_role?: {
    role: string;
    start: string;
    end: string;
    description?: string;
  };
}

export interface Community {
  name: string;
  role: string;
  description: string;
  url?: string;
  active: boolean;
  status?: string;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
}

export interface Profile {
  name: string;
  tagline: string;
  location: string;
  email: string;
  personal_website: string;
  linkedin: string;
  company: string;
  summary: string;
  skills: string[];
  publications: string[];
  experience: Experience[];
  community: Community[];
  projects: Project[];
}

export function loadProfile(): Profile {
  const profilePath = path.join(process.cwd(), 'profile.yaml');
  const fileContents = fs.readFileSync(profilePath, 'utf8');
  return yaml.parse(fileContents) as Profile;
}

export function parseDate(dateStr: string | number): Date {
  if (typeof dateStr === 'number') {
    return new Date(dateStr, 0, 1);
  }
  if (dateStr === 'Present') {
    return new Date();
  }
  const parts = dateStr.split(' ');
  const months: Record<string, number> = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  if (parts.length === 2) {
    const month = months[parts[0]] || 0;
    const year = parseInt(parts[1]);
    return new Date(year, month, 1);
  }
  return new Date(parseInt(dateStr), 0, 1);
}

export function formatDateRange(start: string | number, end: string | number): string {
  const startStr = typeof start === 'number' ? start.toString() : start;
  const endStr = typeof end === 'number' ? end.toString() : end;
  return `${startStr} — ${endStr}`;
}

export function calculateDuration(start: string | number, end: string | number): string {
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12
    + (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} mo`;
  } else if (remainingMonths === 0) {
    return `${years} yr`;
  } else {
    return `${years} yr ${remainingMonths} mo`;
  }
}
