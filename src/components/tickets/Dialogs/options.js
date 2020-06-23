export const issueCategories = [
  {
    type: 'Material Lead Time',
    value: 'transport issue',
    label: 'Transport Issue'
  },
  {
    type: 'Material Lead Time',
    value: 'demand surge',
    label: 'Demand Surge'
  },
  {
    type: 'Material Lead Time',
    value: 'product design change',
    label: 'Product Design Change'
  },
  {
    type: 'Material Quantity',
    value: 'yield issue',
    label: 'Yield Issue'
  },
  {
    type: 'Material Quantity',
    value: 'scrap due to ECO',
    label: 'Scrap Due To ECO'
  },
  {
    type: 'Material Quality',
    value: 'manufacturing issue',
    label: 'Manufacturing Issue'
  },
  {
    type: 'Material Quality',
    value: 'design issue',
    label: 'Design Issue'
  },
  {
    type: 'Material Quality',
    value: 'process issue',
    label: 'Process Issue'
  },
  {
    type: 'Material Quality',
    value: 'training issue',
    label: 'Training Issue'
  }
]

export const issueType = (issueReason) => issueCategories.find(el => el.value === issueReason)

export const components = [
  'ROUTER CPU',
  'ROUTER ROM',
  'ROUTER RAM',
  'ROUTER NVRAM',
  'ROUTER FLASH',
  'ACTIVITY LED',
  'SERIAL PORT',
  'OTHER'
]

export const subclasses = [
  {
    value: 1,
    label: 'Subclass One'
  },
  {
    value: 2,
    label: 'Subclass Two'
  },
  {
    value: 3,
    label: 'Subclass Three'
  }
]


