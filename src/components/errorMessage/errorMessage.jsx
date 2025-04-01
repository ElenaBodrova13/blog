import React from 'react'

import s from './errorMessage.module.css'

function ErrorMessage({ someErr }) {
  const element = someErr ? (
    <div className={s.massage}>{someErr && <p className={s.massageP}>{someErr.message || 'Error'}</p>}</div>
  ) : null
  return element
}

export default ErrorMessage
