import styled from '@emotion/styled'

export const AddButton = styled('div')({
  width: '60px',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '9px',
  border: '1px solid #b84646',
  backgroundColor: 'red',
  color: '#fff',
  margin: '5px 30px 20px auto',
  '&:hover': {
    cursor: 'pointer'
  }
})
