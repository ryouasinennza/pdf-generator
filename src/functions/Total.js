import moment from 'moment';

export const total = (list) => {
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
