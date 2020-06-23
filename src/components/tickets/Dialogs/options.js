export const issueCategories = [
  {
    type: 'Material Lead Time',
    value: 'Transport Issue',
    label: 'Transport Issue'
  },
  {
    type: 'Material Lead Time',
    value: 'Demand Surge',
    label: 'Demand Surge'
  },
  {
    type: 'Material Lead Time',
    value: 'Product Design Change',
    label: 'Product Design Change'
  },
  {
    type: 'Material Quantity',
    value: 'Yield Issue',
    label: 'Yield Issue'
  },
  {
    type: 'Material Quantity',
    value: 'Scrap Due To ECO',
    label: 'Scrap Due To ECO'
  },
  {
    type: 'Material Quality',
    value: 'Manufacturing Issue',
    label: 'Manufacturing Issue'
  },
  {
    type: 'Material Quality',
    value: 'Design Issue',
    label: 'Design Issue'
  },
  {
    type: 'Material Quality',
    value: 'Process Issue',
    label: 'Process Issue'
  },
  {
    type: 'Material Quality',
    value: 'training issue',
    label: 'Training Issue'
  },
  {
    type: 'Other',
    value: 'Other',
    label: 'Other'
  }
]

export const issueCategory = (issueReason) => issueCategories.find(el => el.value === issueReason)

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


