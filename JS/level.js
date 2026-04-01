// Configurable level progression for math game using ranges
// Format: [[minLevel, maxLevel, minOperand, maxOperand, minSum, maxSum], ...]
// Random between min/max for operand/sum each call for variety per playthrough. Tweak freely!

const LEVEL_RANGES = [
  [0, 4, 9, 9, 18, 18],     // Levels 0-4: Basic
  [5, 9, 10, 14, 19, 25],   // Levels 5-9: Higher numbers
  [10, 14, 15, 19, 26, 35], // Levels 10-14: Advanced
  [15, 19, 20, 25, 36, 50]  // Levels 15+: Expert
];

// Get randomized config for level
function getLevelConfig(level) {
  const range = LEVEL_RANGES.find(r => level >= r[0] && level <= r[1]);
  if (!range) {
    return { maxOperand: 9, maxSum: 18 }; // Fallback
  }
  return {
    maxOperand: Math.floor(Math.random() * (range[3] - range[2] + 1)) + range[2],
    maxSum: Math.floor(Math.random() * (range[5] - range[4] + 1)) + range[4]
  };
}

