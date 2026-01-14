// Color palette for the dashboard
export const colors = {
  // Background colors
  dark: {
    primary: '#0D1117',
    secondary: '#161B22',
    tertiary: '#21262D',
    border: '#30363D',
  },
  
  // Accent colors
  accent: {
    blue: '#58A6FF',
    cyan: '#56D4DD',
    green: '#3FB950',
    orange: '#F78166',
    red: '#F85149',
    purple: '#BC8CFF',
    yellow: '#F59E0B',
  },
  
  // Cancer type colors
  cancer: {
    lymphoma: '#8B5CF6',
    solid: '#F59E0B',
    other: '#6B7280',
    // Subtypes
    dlbcl: '#A78BFA',
    tcell: '#C084FC',
    nkcell: '#E879F9',
    melanoma: '#FB923C',
    breast: '#F472B6',
    lung: '#60A5FA',
    glioblastoma: '#34D399',
    pancreatic: '#FBBF24',
    sarcoma: '#F87171',
  },
  
  // Vaccine colors
  vaccine: {
    pfizer: '#0EA5E9',
    moderna: '#EF4444',
    astrazeneca: '#22C55E',
    jj: '#F97316',
    sputnik: '#8B5CF6',
    inactivated: '#6B7280',
    other: '#9CA3AF',
  },
  
  // Study type colors
  study: {
    caseReport: '#60A5FA',
    caseSeries: '#34D399',
    review: '#FBBF24',
    cohort: '#F472B6',
    mechanistic: '#A78BFA',
  },
  
  // Country colors for map
  mapGradient: {
    min: '#1E3A5F',
    low: '#2563EB',
    mid: '#3B82F6',
    high: '#F59E0B',
    max: '#EF4444',
  },
  
  // Text colors
  text: {
    primary: '#F0F6FC',
    secondary: '#8B949E',
    muted: '#484F58',
  },
};

// Get color for cancer type
export const getCancerColor = (type) => {
  const typeMap = {
    'lymphoma': colors.cancer.lymphoma,
    'lymphomas': colors.cancer.lymphoma,
    'lymphomas_leukemias': colors.cancer.lymphoma,
    'solid': colors.cancer.solid,
    'solid_tumors': colors.cancer.solid,
    'other': colors.cancer.other,
    'other_unspecified': colors.cancer.other,
    'dlbcl': colors.cancer.dlbcl,
    'melanoma': colors.cancer.melanoma,
    'breast': colors.cancer.breast,
    'lung': colors.cancer.lung,
    'glioblastoma': colors.cancer.glioblastoma,
    'pancreatic': colors.cancer.pancreatic,
    'sarcoma': colors.cancer.sarcoma,
  };
  return typeMap[type?.toLowerCase()] || colors.cancer.other;
};

// Get color for vaccine type
export const getVaccineColor = (type) => {
  const typeMap = {
    'pfizer': colors.vaccine.pfizer,
    'pfizer_biontech': colors.vaccine.pfizer,
    'pfizer-biontech': colors.vaccine.pfizer,
    'bnt162b2': colors.vaccine.pfizer,
    'moderna': colors.vaccine.moderna,
    'mrna-1273': colors.vaccine.moderna,
    'mrna1273': colors.vaccine.moderna,
    'astrazeneca': colors.vaccine.astrazeneca,
    'chadox1': colors.vaccine.astrazeneca,
    'johnson': colors.vaccine.jj,
    'jj': colors.vaccine.jj,
    'ad26': colors.vaccine.jj,
    'sputnik': colors.vaccine.sputnik,
    'inactivated': colors.vaccine.inactivated,
  };
  return typeMap[type?.toLowerCase()] || colors.vaccine.other;
};

// Chart color palette (array for iterating)
export const chartColors = [
  colors.accent.blue,
  colors.accent.purple,
  colors.accent.cyan,
  colors.accent.orange,
  colors.accent.green,
  colors.accent.red,
  colors.accent.yellow,
];

export default colors;
