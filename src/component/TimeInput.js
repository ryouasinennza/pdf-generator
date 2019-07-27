import React, { useState } from 'react'
import styled from '@emotion/styled'

export const BaseInput = styled('input')({
  width: '100%',
  padding: 0,
  border: 'none',
  borderRadius: 0,
  outline: 'none',
  background: 'none',
  backgroundColor: 'transparent',
  textAlign: 'center',
})

export const TimeInput = React.memo((props) => {

  const {
    This,
    type,
    changeState,
    timeValue,
    index,
    valueIndex,
    disabled
  } = props

  const [time, setTime] = useState(timeValue)

  return (
    <BaseInput
      type={type}
      value={time}
      disabled={!!disabled}
      onChange={(event) => setTime(event.target.value)}
      onBlur={(event) => changeState(This,event.target.value, index, valueIndex)}
    />
  )
})

