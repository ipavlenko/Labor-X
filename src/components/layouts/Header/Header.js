import React from 'react'
import PropTypes from 'prop-types'
import { Link, Tip } from 'components/common'
import { RightPanel } from 'src/components/layouts'
import { connect } from 'react-redux'
import { logout } from 'src/store'
import FirstMenu from '../FirstMenu/FirstMenu'
import css from './Header.scss'

export class Header extends React.Component {

  static propTypes = {
    handleLogout: PropTypes.func.isRequired,
  }

  constructor (){
    super()

    this.state = {
      isVisibleRightPanel: false,
    }
  }

  handleOpenPanel (){
    this.setState({ isVisibleRightPanel: true })
    document.body.classList.add('show-overlay')
  }

  handleClosePanel (){
    this.setState({ isVisibleRightPanel: false })
    document.body.classList.remove('show-overlay')
  }

  render () {
    const prefix = this.constructor.name

    return (
      <div className={css.root}>
        <div className={css.headerLeft}>
          <Link href='/' className={css.logo}>
            <img src='/static/images/labor-x-logo.svg' className={css.logoImg} />
          </Link>
          <FirstMenu />
        </div>
        <div className={css.headerRight}>
          <nav className={css.actions}>
            <Link href='/job-types' className={css.actionItem} label='nav.newJob' />
            <Link href='/create-job-board' className={css.actionItem} label='nav.newBoard' />
            <a className={css.actionItem} onClick={() => this.props.handleLogout()}>Log out</a>
          </nav>
          <div className={css.points}>
            <Tip
              title={`${prefix}.actionPoints`}
              tip={`${prefix}.actionPointsDescription`}
            >
              <img src='/static/images/icon-active-points.svg' className={css.pointsIcon} />
            </Tip>
            <span className={css.pointsValue}>70</span>
          </div>

          <div className={css.profile}>
            <div className={css.profileWrapper} onClick={this.handleOpenPanel.bind(this)}>
              <img src='/static/temp/icon-profile.jpg' className={css.profileIcon} />
              <div className={css.profileCounter}>99</div>
            </div>
          </div>
        </div>

        <RightPanel open={this.state.isVisibleRightPanel} onClose={this.handleClosePanel.bind(this)} />

      </div>
    )
  }
}

function mapStateToProps (/*state*/) {
  // const signer = signerSelector()(state)
  return {
    // signer,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleLogout: () => {
      dispatch(logout())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
