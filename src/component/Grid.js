import React from 'react'
import styled from '@emotion/styled'

export const Grid = (props) => {

  const G = styled('div')({
    display: 'grid',
    gridTemplateColumns: '150px 150px 150px 150px 150px 150px 150px',
    gridTemplateRows: '30px',
    backgroundColor: props.index === true ? '#bfbfbf' : '#fff'
  })

  return (<G>{props.children}</G>)
}

