import PropTypes from 'prop-types'
import React from 'react'
import { I18n } from 'react-redux-i18n'
import TextField from 'material-ui/TextField'
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles'

import { Translate } from 'components/common'

import css from './Input.scss'

let WrappedField = (props) => {console.log('props', props);return (
  <TextField
    label={props.label}
    placeholder={I18n.t(props.placeholder)}
    className={props.classNames}
    margin='normal'
    type={props.type}
    InputProps={{className: props.inputWrapperMods }}
    inputProps={{className: props.inputMods }}
    InputLabelProps={{className: props.labelMods }}
    {...props.input}
  />
)}

export default class Input extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    invert: PropTypes.bool,
    disabled: PropTypes.bool,
    lineEnabled: PropTypes.bool,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    }),
    autoComplete: PropTypes.bool,
    mods: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    inputMods: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    errorMods: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    materialInput: PropTypes.bool,
  }

  static TYPES = {
    TEXT: 'text',
    PASSWORD: 'password',
  }

  static MODS = {
    INVERT: css.invert,
    HUGE: css.huge,
    BOXED: css.boxed,
  }

  static defaultProps = {
    disabled: false,
    input: {
      value: '',
      name: 'input',
    },
    type: Input.TYPES.TEXT,
    meta: {
      touched: false,
      error: null,
    },
    placeholder: '',
    autoComplete: true,
    // TODO @dkchv: add normal as default mod
    mods: [],
    lineEnabled: false,
    materialInput: false,
  }

  render () {
    const { className, placeholder, type, input, label, meta, disabled, inputMods, inputWrapperMods, errorMods, lineEnabled, autoComplete,
      mods, materialInput, labelMods } = this.props
    const classNames = [ css.root, materialInput ? css.materialInputField : '' ].concat(mods)
    const inputModsArray = [css.input, materialInput ? css.materialInput : '' ].concat(inputMods)
    const errorClassNames = [css.error].concat(errorMods)
    const labelClassNames = [css.label].concat(labelMods)
    
    const materialInputWrapperArray = [css.materialInputWrapper].concat(inputWrapperMods)
    
    className && classNames.push(className)
    meta.touched && meta.error && classNames.push(css.invalid)
    input.autoComplete = autoComplete ? 'on' : 'off'
    

    return (
      <div className={materialInput ? '' : classNames.join(' ')}>
        {label && !materialInput && <div className={css.label}><Translate value={label} /></div>}
        {
          materialInput ? (
            <WrappedField
              label={label}
              placeholder={placeholder}
              classNames={classNames.join(' ')}
              type={type}
              inputWrapperMods={ materialInputWrapperArray.join(' ') }
              inputMods={ inputModsArray.join(' ') }
              labelMods={ labelClassNames.join(' ') }
              input={input}
            />
          ) : (
            <input
              className={inputModsArray.join(' ')}
              placeholder={I18n.t(placeholder)}
              type={type}
              disabled={disabled}
              {...input}
            />
          )
        }
        { lineEnabled ? <div className={css.line} /> : false }
        {meta.touched && meta.error && <div className={errorClassNames.join(' ')}><Translate value={meta.error} /></div>}
      </div>
    )
  }
}
