import React from 'react'
import styled from '@emotion/styled'

const colors = {
  primary: '#92e8f5',
  choice: 'rgba(146,232,245,0.1)',
}
export const Grid = (props) => {

  const {
    focus,
  } = props

  const Element = styled('div')({
    display: 'grid',
    gridTemplateColumns: '150px 150px 150px 150px 150px 150px 150px',
    gridTemplateRows: '30px',
    color: colors.primary,
    margin: '4px 8px',
    border: '1px solid',
    borderColor: colors.primary,
    borderRadius: '3px',
    alignItems: 'center',
    backgroundColor: focus ? colors.choice : 'transparent',
    '&:hover':{
      backgroundColor: colors.choice,
    }
  })

  return <Element>{props.children}</Element>
}

