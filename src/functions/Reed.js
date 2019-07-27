export const Reed = (This, list) => {

  const str = localStorage.getItem('OperatingTime');

  if (str) {

    const array = str.split(',')
    let newList = []
    let sixArray = []
    let i2 = 0

    newList[i2] = list[0]
    i2++

    for (let i = 0; i < array.length; i++) {
      sixArray.push(array[i])
      console.log('', i)
      if (((i + 1) % 6) === 0) {
        console.log("new")
        newList[i2] = sixArray
        sixArray = []
        i2++
      }
    }

    This.setState({
      list: newList
    })
  }
}
