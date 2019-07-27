export const Save = (list) => {
  list.shift()
  localStorage.setItem('OperatingTime', list.toString());
}
