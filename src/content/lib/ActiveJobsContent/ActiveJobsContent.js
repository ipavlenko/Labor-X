import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { groupBy } from 'lodash'
import { SignerModel } from 'src/models'
import { signerSelector, jobsListSelector, boardByIdSelector, newJobNoticeSelector, profileSelector } from 'src/store'
import { Translate, ActiveJobCard } from 'src/components/common'
import css from './ActiveJobsContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class ActiveJobsContent extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel),
    totalCount: PropTypes.number.isRequired,
    toPayCount: PropTypes.number.isRequired,
    inProgressCount: PropTypes.number.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.shape(ActiveJobCard.propTypes)),
      })
    ),
  }

  renderHead ({ toPayCount, inProgressCount, totalCount }) {
    return (
      <div className={css.title}>
        <div className={css.titleText}><Translate value='nav.activeJobs' /></div>
        <div className={css.titleStats}>
          <div>
            <h2 className={css.titleStatsCounter}>{toPayCount}</h2>
            <div className={css.medium}>To Pay</div>
          </div>
          <div>
            <h2 className={css.titleStatsCounter}>{inProgressCount}</h2>
            <div>In Progress</div>
          </div>
          <div>
            <h2 className={css.titleStatsCounter}>{totalCount}</h2>
            <div>Active</div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { groups, totalCount, toPayCount, inProgressCount } = this.props
    return groups == null ? null : (
      <div className={css.main}>
        {!groups.length ? null : this.renderHead({ totalCount, toPayCount, inProgressCount })}
        <div className={css.content}>
          {groups.map(({ key, date, cards }) => (
            <div className={css.section} key={key}>
              <h3>{moment(date).format(dateFormat)}</h3>
              {cards.map((card) => (
                <ActiveJobCard {...card} key={card.job.key} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const jobs = jobsListSelector()(state)

  const cards = jobs
    .filter((/*job*/) => true) // TODO @ipavlenko: Only active jobs
    .map(job => ({
      job,
      board: boardByIdSelector(job.boardId)(state),
      notice: newJobNoticeSelector(signer.address, job.id)(state),
      worker: profileSelector(job.worker)(state),
      recruiter: profileSelector(job.recruiter)(state),
    }))

  const inProgressCount = cards
    .filter(card => card.worker != null)
    .length

  const groups = groupBy(cards, card => moment(card.job.extra.publishedAt).format('YYYY-MM-DD'))
  return {
    signer,
    totalCount: cards.length,
    toPayCount: cards.length - inProgressCount,
    inProgressCount,
    groups: Object.entries(groups)
      .map(([key, cards]) => ({
        key,
        date: cards[0].job.extra.publishedAt,
        cards,
      }))
      .sort((a, b) => -moment(a.date).diff(moment(b.date))),
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobsContent)
