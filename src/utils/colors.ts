const colorMap: Record<string, { bg: string; text: string }> = {
  'EM': { bg: '#FFE2E5', text: '#FF6B6B' },  // Pink theme
  'MJ': { bg: '#E0F5E9', text: '#38A169' },  // Green theme
  'SL': { bg: '#E5ECF6', text: '#4299E1' },  // Blue theme
  'RB': { bg: '#FFF3E2', text: '#ED8936' },  // Orange theme
  'AW': { bg: '#F3E5FF', text: '#9F7AEA' },  // Purple theme
  'DM': { bg: '#E2F6FF', text: '#38B2AC' },  // Cyan theme
  'CL': { bg: '#5B45E0', text: '#FFFFFF' },  // White text for current user
};

export const getColorForUser = (userId: string) => {
  return colorMap[userId] || { bg: '#E8EFF7', text: '#4B5563' };
}; 