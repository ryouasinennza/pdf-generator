import React, { Component } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AddButton, AppContainer, Grid, GridItem, TimeInput, ButtonBox, BaseButton } from './component'
import { inkan } from './inkan';
import { Add, Delete, ChangeValue, Save, Reed } from './functions'

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
    choice: 0
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
          text: '2019年7月 作業報告書',
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

  render() {
    return (
      <AppContainer>
        稼働調整したところ（お休み、遅刻早退など）はわかるように備考に記載
        <AddButton onClick={() => Add(this)}>追加</AddButton>
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
                  <TimeInput
                    This={this}
                    type='date'
                    timeValue={value[0]}
                    changeState={ChangeValue}
                    index={index}
                    valueIndex={0}
                  />
                </GridItem>
                <GridItem>
                  <TimeInput
                    This={this}
                    type='time'
                    timeValue={value[1]}
                    changeState={ChangeValue}
                    index={index}
                    valueIndex={1}
                  />
                </GridItem>
                <GridItem>
                  <TimeInput
                    This={this}
                    type='time'
                    timeValue={value[2]}
                    changeState={ChangeValue}
                    index={index}
                    valueIndex={2}
                  />
                </GridItem>
                <GridItem>
                  <TimeInput
                    This={this}
                    type='time'
                    timeValue={value[3]}
                    changeState={ChangeValue}
                    index={index}
                    valueIndex={3}
                  />
                </GridItem>
                <GridItem>
                  <TimeInput
                    This={this}
                    type='time'
                    timeValue={value[4]}
                    changeState={ChangeValue}
                    index={index}
                    valueIndex={4}
                    disabled={true}
                  />
                </GridItem>
                <GridItem>
                  <TimeInput
                    This={this}
                    type='text'
                    timeValue={value[5]}
                    changeState={ChangeValue}
                    index={index}
                    valueIndex={5}
                  />
                </GridItem>
                <GridItem>
                  <button onClick={() => Delete(this, index)}>delete</button>
                </GridItem>
              </Grid>
            )
          }

          return items

        })}
        <div> 稼働時間 {this.state.total}</div>
        <ButtonBox>
          <BaseButton onClick={this.download}>ダウンロード</BaseButton>
          <BaseButton onClick={() => Save(Array.from(this.state.list))}>保存</BaseButton>
          <BaseButton onClick={() => Reed(this, Array.from(this.state.list))}>読み込み</BaseButton>
        </ButtonBox>
      </AppContainer>
    )
  }
}


export default App;
