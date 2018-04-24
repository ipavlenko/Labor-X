import React from 'react'
import { Widget, Image, Translate } from 'components/common'

export default class ValidationTab extends React.Component {
  render () {
    return (
      <div>
        <Widget
          title='ui.myProfile.validation.yourLevel'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              label: 'ui.myProfile.validation.general.general',
            },
            {
              href: '/general-profile#photo',
              firstIcon: Image.SETS.SHIELD_SUCCESS,
              label: 'ui.myProfile.validation.general.photoNameDate',
            },
            {
              href: '/general-profile#email',
              firstIcon: Image.SETS.SHIELD_SUCCESS,
              label: 'ui.myProfile.validation.general.phoneMail',
            },
            {
              href: '/general-profile#address',
              firstIcon: Image.SETS.SHIELD_ERROR,
              label: 'ui.myProfile.validation.general.homeAddress',
            },

            {
              label: 'ui.myProfile.validation.recruiter.recruiter',
            },
            {
              href: '/recruiter-profile',
              firstIcon: Image.SETS.SHIELD_ERROR,
              label: 'ui.myProfile.validation.recruiter.recruiterInformation',
            },

            {
              label: 'ui.myProfile.validation.worker.worker',
            },
            {
              href: '/worker-profile',
              firstIcon: Image.SETS.SHIELD_SUCCESS,
              label: 'ui.myProfile.validation.worker.workerInformation',
            },

            {
              label: 'ui.myProfile.validation.client.client',
            },
            {
              href: '/client-profile',
              firstIcon: Image.SETS.SHIELD_ERROR,
              label: 'ui.myProfile.validation.client.clientInformation',
            },
          ]}
        >
          <Translate value='ui.myProfile.validation.yourLevelText' />
        </Widget>

        <Widget
          title='ui.myProfile.validation.evaluator.evaluator'
          subtitle='ui.myProfile.validation.evaluator.evaluatorInformation'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              label: 'Task One',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_CIRCLE,
              },
            },
            {
              label: 'Task Two',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_CIRCLE,
              },
            },
            {
              label: 'Task Three',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_CIRCLE,
              },
            },
          ]}
        />

        <Widget
          title='ui.myProfile.validation.publicProfilePages'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              href: '/recruiter-profile',
              label: 'ui.myProfile.validation.recruiter.recruiter',
              isLink: true,
            },
            {
              href: '/worker-profile',
              label: 'ui.myProfile.validation.worker.worker',
              isLink: true,
            },
            {
              href: '/client-profile',
              label: 'ui.myProfile.validation.client.client',
              isLink: true,
            },
          ]}
        />
      </div>
    )
  }
}
