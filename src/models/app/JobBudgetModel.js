import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

export const schemaFactory = () => ({
  isSpecified: PropTypes.bool,
  hourlyRate: PropTypes.string,
  totalHours: PropTypes.string,
})

export default class JobBudgetModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }

  get award (): BigNumber {
    if (this.isSpecified) {
      const a = new BigNumber(this.hourlyRate)
      const b = new BigNumber(this.totalHours)
      return a.multipliedBy(b)
    }
    return null
  }

  get hourlyRateAward (): BigNumber {
    if (this.isSpecified) {
      return new BigNumber(this.hourlyRate)
    }
    return null
  }
}

function propsWithDefaults (props) {
  const {
    hourlyRate,
    totalHours,
    ...other
  } = props
  return Object.assign({}, {
    isSpecified: faker.random.boolean(),
    hourlyRate: hourlyRate != null
      ? String(hourlyRate)
      : String(faker.random.number({ min: 5, max: 40 })),
    totalHours: totalHours != null
      ? String(totalHours)
      : String(faker.random.number({ min: 1, max: 40 }) * 5),
  }, other)
}
