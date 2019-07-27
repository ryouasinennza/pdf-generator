export const Delete = (This , index) => {
  const state = Object.assign({}, This.state)
  state.list.splice(index, 1)
  This.setState(state)
}
