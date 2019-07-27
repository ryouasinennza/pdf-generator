import moment from 'moment';

export const Add = (This) => {
  const state = Object.assign({}, This.state)
  state.list = [
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
  This.setState(state)
}
