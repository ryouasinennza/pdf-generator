import React, { Component } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AddButton, AppContainer, Grid, GridItem, TimeInput } from './component'
import moment from 'moment';
import { inkan } from './inkan';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class App extends Component {

  state = {
    list: [
      [
        {text: '日付',},
        {text: '出社時刻',},
        {text: '退社時刻',},
        {text: '休憩時間',},
        {text: '稼働時間'},
        {text: '備考',},
      ]
    ],
    total: '00:00',
    choice: 0,
    test: '00:00'
  }

  add = () => {
    const state = Object.assign({}, this.state)
    state.list.push([
      moment(new Date()).format('YYYY-MM-DD'),
      '10:00',
      '19:00',
      '01:00',
      '08:00',
      ''
    ])
    this.setState(state)
  }

  delete = (index) => {
    const state = Object.assign({}, this.state)
    state.list.splice(index, 1)
    this.setState(state)
  }

  valueChange = (value, index, valueIndex) => {


    console.log('event.target.value', value)
    const list = Array.from(this.state.list)
    const valArray = Array.from(list[index])
    valArray[valueIndex] = value


    list[index] = valArray

    if (index !== 0) {
      const dataTo = moment(`2000-01-01 ${list[index][1]}`)
      const dataFrom = moment(`2000-01-01 ${list[index][2]}`)
      const diff = moment(dataFrom.diff(dataTo))
      // 時差 休憩時間を引く
      list[index][4] = diff.subtract(10, 'hour').format('HH:mm')
    }
    const total = this.total(Array.from(list))
    this.setState({
      list: list,
      choice: index,
      total: total
    })
  }

  total = (list) => {
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

  save = () => {
    const state = Object.assign({}, this.state)
    const arr = []
    for (let i = 0; i < state.list.length; i++) {
      if (i !== 0) {
        arr.push(Array.from(state.list[i]))
      }
    }
    localStorage.setItem('OperatingTime', arr.toString());
  }

  reed = () => {
    const state = Object.assign({}, this.state)

    const str = localStorage.getItem('OperatingTime');
    let arr = str.split(',')
    let newArr = []
    let newArr2 = []
    let i2 = 0
    for (let i = 0; i < arr.length; i++) {
      if (i !== 0 && (i % 6) === 0) {
        newArr[i2] = newArr2
        i2++
        newArr2 = []
      }
      newArr2.push(arr[i])
    }
    state.list.push(newArr)
    this.setState(state)
  }

  download = () => {

    pdfMake.fonts = {
      GenYoMin: {
        normal: 'GenYoMinJP-Regular.ttf',
        bold: 'GenYoMinJP-Bold.ttf',
      },
    };

    const docDefinition = {
      content: [
        {
          text: '年月作業報告書',
          margin: [2, 0, 0, 10],
          fontSize: 15,
        },
        {
          columns: [
            {
              width: 150,
              height: 30,
              margin: [2, 0, 0, 10],
              text: 'EBA 株式会社  池田 秀春',
            },
            {
              image: inkan,
              width: 20,
              height: 20,
              margin: [2, 0, 0, 10]
            },
          ]
        },
        {
          text: '下記の通り作業した事をご報告します。',
          margin: [2, 0, 0, 5]
        },
        {
          style: 'table',
          table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            headerRows: 1,
            body: this.state.list
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        },
        {
          style: 'table2',
          table: {
            widths: [50, 50],
            body: [
              ['稼働合計', this.state.total],
            ]
          }
        },
      ],
      styles: {
        table: {
          fontSize: 11,
        },
        table2: {
          fontSize: 11,
          margin: [0, 10, 0, 0]
        },
      },
      defaultStyle: {
        font: 'GenYoMin',
      },
    };
    pdfMake.createPdf(docDefinition).download();
  };


  test = (e) => {

    this.setState({
      test: e.target.value
    })
  }

  render() {
    console.log('', this.state)
    return (
      <AppContainer>
        <AddButton onClick={this.add}>追加</AddButton>
        {this.state.list.map((value, index) => {
          let items = []
          if (index === 0) {
            items = (
              <Grid key={index}>
                <GridItem>{value[0].text}</GridItem>
                <GridItem>{value[1].text}</GridItem>
                <GridItem>{value[2].text}</GridItem>
                <GridItem>{value[3].text}</GridItem>
                <GridItem>{value[4].text}</GridItem>
                <GridItem>{value[5].text}</GridItem>
                <GridItem>削除</GridItem>
              </Grid>
            )
          } else {
            items = (
              <Grid key={index} index={index === this.state.choice}>
                <GridItem>
                  <TimeInput type='date' value={value[0]}
                             onChange={(event) => this.valueChange(event.target.value, index, 0)}/>
                </GridItem>
                <GridItem>
                  <TimeInput type='time' value={value[1]}
                             onChange={(event) => this.valueChange(event.target.value, index, 1)}/>
                </GridItem>
                <GridItem>
                  <TimeInput type='time' value={value[2]}
                             onChange={(event) => this.valueChange(event.target.value, index, 2)}/>
                </GridItem>
                <GridItem>
                  <TimeInput type='time' value={value[3]}
                             onChange={(event) => this.valueChange(event.target.value, index, 3)}/>
                </GridItem>
                <GridItem>
                  <TimeInput value={value[4]} disabled='disabled'/>
                </GridItem>
                <GridItem>
                  <TimeInput value={value[5]} onChange={(event) => this.valueChange(event.target.value, index, 5)}/>
                </GridItem>
                <GridItem>
                  <button onClick={() => this.delete(index)}>delete</button>
                </GridItem>
              </Grid>
            )
          }

          return items

        })}
        <div>{this.state.total}</div>
        <button onClick={this.download}>ダウンロード</button>
        <button onClick={this.save}>保存</button>
        <button onClick={this.reed}>読み込み</button>

        <TimeInput type='time' value={this.state.test} onChange={(event) => this.test(event)}/>
      </AppContainer>
    )
  }
}


export default App;
