import React from 'react'
import { parseISO, format } from 'date-fns'

import s from './avatar.module.css'

function Avatar({ name, avatar, time }) {
  function timeElement(data) {
    const newDate = data === '' ? '2023-09-26' : data
    return <div className={s.time}>{format(parseISO(newDate), 'PP')}</div>
  }
  const element = time !== undefined ? timeElement(time) : null
  const poster =
    avatar || 'https://avatars.mds.yandex.net/i?id=0349050f2e9ff0185f0ce4946158af9f1e88d78c-5443655-images-thumbs&n=13'

  return (
    <div className={s.wrapperAuthor}>
      <div className={s.authorInfo}>
        <div className={s.name}>{name}</div>
        {element}
      </div>
      <img alt="avatar" className={s.avatar} src={poster} />
    </div>
  )
}

export default Avatar
