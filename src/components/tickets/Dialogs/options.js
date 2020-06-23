export const issueCategories = [
  {
    title: 'Material Lead Time',
    issues: [
      {
        value: 'transport issue',
        label: 'Transport Issue'
      },
      {
        value: 'demand surge',
        label: 'Demand Surge'
      },
      {
        value: 'product design change',
        label: 'Product Design Change'
      },
    ]
  },
  {
    title: 'Material Quantity',
    issues: [
      {
        value: 'yield issue',
        label: 'Yield Issue'
      },
      {
        value: 'scrap due to ECO',
        label: 'Scrap Due To ECO'
      },
    ]
  },
  {
    title: 'Material Quality',
    issues: [
      {
        value: 'manufacturing issue',
        label: 'Manufacturing Issue'
      },
      {
        value: 'design issue',
        label: 'Design Issue'
      },
      {
        value: 'process issue',
        label: 'Process Issue'
      },
      {
        value: 'training issue',
        label: 'Training Issue'
      },
    ]
  }
]

export const categories = issueCategories.map(category => category.title)
export const issues = issueCategories.map(category => category.issues).flat()

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


