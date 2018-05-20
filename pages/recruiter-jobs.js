import React from 'react'
import RecruiterJobsContent from 'src/components/RecruiterJobs/RecruiterJobs'
import { MainLayout } from 'src/components/layouts'
import { JobCard } from 'src/components/common'
import withRedux from 'next-redux-wrapper'
import initialStore from 'src/store'
import 'styles/globals/globals.scss'

const RECRUITER_JOBS = {
  expectedRewards: 10,
  earned: 7,
  reviewTab: {
    jobCards: [
      {
        title: 'Get Started at Become Involved',
        icon: '/static/temp/get-started.png',
        status: JobCard.STATUSES.PROBLEM,
        jobName: 'Install 10 Gas Ovens',
        date: new Date('2017-12-20'),
        award: 10,
      },
      {
        title: 'Get Started at Become Involved',
        icon: '/static/temp/get-started.png',
        status: JobCard.STATUSES.APPLIED,
        jobName: 'Install 10 Gas Ovens',
        date: new Date('2017-12-20'),
        award: 10,
        applicants: 120,
        offers: 1,
        applicantsNew: 1,
        offersNew: 1,
      },
    ],
    feedbackCards: [
      {
        title: 'Move Stuff from A to B and C and D',
        jobName: 'Get Started Client',
        jobIcon: '/static/temp/get-started.png',
        recruiterName: 'Anna German Recruiter',
        recruiterIcon: '/static/temp/worker-3.jpg',
      },
    ],
  },
}

class JobsPage extends React.Component {
  static propTypes = {
    // boardsList: PropTypes.instanceOf(SignerModel).isRequired,
  }

  render () {
    return (
      <MainLayout title='nav.recruiterJobs'>
        <RecruiterJobsContent {...RECRUITER_JOBS} />
      </MainLayout>
    )
  }
}

// function mapStateToProps (state) {
//   const boardsList = boardsListSelector()(state)
//   // eslint-disable-next-line
//   console.log('boardsList', boardsList)
//   return {
//     boardsList,
//   }
// }

// function mapDispatchToProps (/*dispatch*/) {
//   return {
//     // stack: state.modals.stack,
//   }
// }

export default withRedux(initialStore)(JobsPage)

// export default connect(mapStateToProps, mapDispatchToProps)(JobsPage)
// export default JobsPage
