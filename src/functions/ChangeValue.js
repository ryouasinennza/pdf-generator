import moment from 'moment';

export const ChangeValue = (This, value, index, valueIndex) => {
  const list = This.state.list.slice()
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
    choice: index,
    total: total(Array.from(list))
  })
}

const total = (list) => {
  let hour = 0
  let minute = 0

  for (let i = 0; i < list.length; i++) {
    if (i !== 0) {
      const h = Number(moment(`2000-01-01 ${list[i][4]}`).format('H'))
      const m = Number(moment(`2000-01-01 ${list[i][4]}`).format('mm'))

      hour += h
      minute += m
    }
  }

  hour += Math.floor(minute / 60);
  let min = minute % 60;
  let stringMin = ''
  if (String(min).length === 1) {
    stringMin = `0${min}`
  } else {
    stringMin = min
  }

  return `${hour}: ${stringMin}`
}
