import moment from 'moment';
import {total} from './Total'

export const ChangeValue = (This, value, index, valueIndex) => {
  const list = This.state.list.slice()

  if (!value) {
    value = '00:00'
  }

  list[index][valueIndex] = value

  if (index !== 0) {
    const dataTo = moment(`2000-01-01 ${list[index][1]}`)
    const dataFrom = moment(`2000-01-01 ${list[index][2]}`)
    const diff = moment(dataFrom.diff(dataTo))
    // 時差 休憩時間を引く
    list[index][4] = diff.subtract(10, 'hour').format('HH:mm')
  }

  This.setState({
    list: list,
    total: total(Array.from(list))
  })
}
