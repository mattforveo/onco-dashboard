// Number formatting utilities

/**
 * Format large numbers with K, M, B suffixes
 */
export const formatNumber = (num, decimals = 1) => {
  if (num === null || num === undefined) return 'N/A';
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  return num.toString();
};

/**
 * Format number with commas
 */
export const formatWithCommas = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format percentage
 */
export const formatPercent = (num, decimals = 1) => {
  if (num === null || num === undefined) return 'N/A';
  return `${num.toFixed(decimals)}%`;
};

/**
 * Format hazard ratio
 */
export const formatHR = (hr, decimals = 2) => {
  if (hr === null || hr === undefined) return 'N/A';
  return hr.toFixed(decimals);
};

/**
 * Format date string
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time onset (days)
 */
export const formatOnset = (days) => {
  if (days === null || days === undefined) return 'N/A';
  if (typeof days === 'string') return days;
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  if (days < 30) return `${Math.round(days / 7)} weeks`;
  if (days < 365) return `${Math.round(days / 30)} months`;
  return `${(days / 365).toFixed(1)} years`;
};

/**
 * Get label for vaccine type
 */
export const getVaccineLabel = (type) => {
  const labels = {
    'Pfizer_BioNTech_BNT162b2': 'Pfizer-BioNTech',
    'Moderna_mRNA1273': 'Moderna',
    'Both_Pfizer_and_Moderna': 'Both mRNA',
    'AstraZeneca_ChAdOx1': 'AstraZeneca',
    'Johnson_Johnson_Ad26': 'Johnson & Johnson',
    'Sputnik_V': 'Sputnik V',
    'Inactivated_vaccines': 'Inactivated',
    'Unspecified': 'Unspecified',
  };
  return labels[type] || type;
};

/**
 * Get label for cancer type
 */
export const getCancerLabel = (type) => {
  const labels = {
    'lymphomas_leukemias': 'Lymphomas & Leukemias',
    'solid_tumors': 'Solid Tumors',
    'other_unspecified': 'Other/Unspecified',
    'DLBCL': 'Diffuse Large B-Cell Lymphoma',
    'CTCL': 'Cutaneous T-Cell Lymphoma',
    'ALCL': 'Anaplastic Large Cell Lymphoma',
    'AITL': 'Angioimmunoblastic T-Cell Lymphoma',
  };
  return labels[type] || type;
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export default {
  formatNumber,
  formatWithCommas,
  formatPercent,
  formatHR,
  formatDate,
  formatOnset,
  getVaccineLabel,
  getCancerLabel,
  truncate,
};
