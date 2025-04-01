import React from 'react'
import { Flex, Spin } from 'antd'

import './loading.css'

function Loading() {
  return (
    <div className="spin">
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    </div>
  )
}
export default Loading
