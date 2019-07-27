import moment from 'moment';
import {total} from './Total'

export const Add = (This) => {
  const list = [
    ...This.state.list,
    [
      moment(new Date()).format('YYYY-MM-DD'),
      '10:00',
      '19:00',
      '01:00',
      '08:00',
      ''
    ]
  ]
  This.setState({
    list: list,
    total: total(Array.from(list))
  })
}
