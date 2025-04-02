import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import * as actions from '../../actions'

import s from './alertMessage.module.css'

function AlertMessage({ err }) {
  let mes = ''
  if (axios.isAxiosError(err)) {
    // const key = Object.keys(err.response.data.errors)
    const array = Object.entries(err.response.data.errors)

    // const value = err.response.data.errors[key]

    mes = array.map((x) => x.join(' '))

    // if (err.data.errors['email or password'] === 'is invalid') {
    //     mes = 'Не верный адресс почты или пароль'
    //    }
  }

  const element = err ? (
    <div className={s.massage}>
      {' '}
      <p className={s.massageP}>{mes || 'Error'}</p>
    </div>
  ) : null
  return element
}
function mapSate(state) {
  return {
    err: state.error,
  }
}
export default connect(mapSate, actions)(AlertMessage)
