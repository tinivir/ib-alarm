const ESecType = {
  STK: 'Stock',
  CONTFUT: 'Futures',
  IND: 'Index',
  CFD: 'CFD',
  BOND: 'Bond',
  CASH: 'FX Pair',
  CMDTY: 'Commodities'
};

export const getSecTypeLabel = value => ESecType[value];

export const secTypes = Object.entries(ESecType).map(([value, label]) => ({
  value,
  label
}));
