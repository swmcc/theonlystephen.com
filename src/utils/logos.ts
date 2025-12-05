// Company logo URLs - using Clearbit Logo API for real company logos
// Falls back to placeholder for companies not found

const companyLogos: Record<string, string> = {
  'EXL': 'https://logo.clearbit.com/exlservice.com',
  'SkillfulGorilla': '/skillfulgorilla-logo.png',
  'Faria Education Group': 'https://logo.clearbit.com/faria.org',
  'Futrli': 'https://logo.clearbit.com/futrli.com',
  'ShopKeep': 'https://logo.clearbit.com/shopkeep.com',
  'AuditComply': '/auditcomply-logo.png',
  'Six Degree Labs': '/sixdegreelabs-logo.png',
  'saltDNA': 'https://logo.clearbit.com/saltdna.com',
  'RepKnight': '', // Will use placeholder
  'Tascomi Ltd.': 'https://logo.clearbit.com/tascomi.com',
  'rehabstudio': 'https://logo.clearbit.com/rehabstudio.com',
  'Maildistiller': '', // Will use placeholder
  'VHS Distribution / Sendit.com / BlackStar.co.uk': 'https://logo.clearbit.com/blackstar.co.uk',
  'Atlas Communications (NI) Ltd': '', // Will use placeholder
  'CV3.com': '', // Will use placeholder
  'BlackStar.co.uk': 'https://logo.clearbit.com/blackstar.co.uk',
};

export function getCompanyLogo(company: string): string | null {
  return companyLogos[company] || null;
}

export function getCompanyInitials(company: string): string {
  // Handle special cases
  if (company.includes('/')) {
    return company.split('/')[0].trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  const words = company.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
