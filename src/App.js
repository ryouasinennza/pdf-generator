import React, { Component } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import { inkan } from './inkan';
import {
  AppContainer,
  Grid,
  GridItem,
  TimeInput,
  ButtonBox,
  OutLineTextFiled,
  OutLineButton,
  DeleteButton
} from './component'

import {
  Add,
  Delete,
  ChangeValue,
  Save, Reed,
  Download
} from './functions'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TYPES = [
  'date',
  'time',
  'time',
  'time',
  'time',
  'text',
]

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
    name: 'name',
    company: 'EBA 株式会社',
    date: moment(new Date()).format('YYYY年MM月'),
    total: '00:00',
    choice: 0
  }

  changeRequiredValue = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  render() {

    return (
      <AppContainer>
        <ButtonBox>
          <OutLineTextFiled
            disabled={false}
            label='Name'
            type='text'
            value={this.state.name}
            onChange={this.changeRequiredValue}
            changeKey='name'
          />
          <OutLineTextFiled
            disabled={false}
            label='Company'
            type='text'
            value={this.state.company}
            onChange={this.changeRequiredValue}
            changeKey='company'
          />
          <OutLineTextFiled
            disabled={false}
            label='Year and month'
            type='text'
            value={this.state.date}
            onChange={this.changeRequiredValue}
            changeKey='date'
          />
          <OutLineTextFiled
            disabled={true}
            label='Total Operating Time'
            type='text'
            value={this.state.total}
            onChange={() => console.log('Total')}
            changeKey=''
          />
        </ButtonBox>
        <ButtonBox>
          <OutLineButton onClick={() => Download(
            Array.from(this.state.list),
            this.state.total,
            this.state.name,
            this.state.company,
            this.state.date,
            inkan,
          )}>Download</OutLineButton>
          <OutLineButton onClick={() => Save(Array.from(this.state.list))}>Save</OutLineButton>
          <OutLineButton onClick={() => Reed(this, Array.from(this.state.list))}>Read</OutLineButton>
          <OutLineButton onClick={() => Add(this)}>Add</OutLineButton>
        </ButtonBox>
        {this.state.list.map((value, index) => {
          let items = []
          if (index === 0) {
            items = (
              <Grid key={index} focus={true}>
                <GridItem>Date</GridItem>
                <GridItem>Start</GridItem>
                <GridItem>End</GridItem>
                <GridItem>Break Time</GridItem>
                <GridItem>Operating Time</GridItem>
                <GridItem>Note</GridItem>
                <GridItem>Delete</GridItem>
              </Grid>
            )
          } else {
            items = (
              <Grid key={index} focus={false}>
                {TYPES.map((type, typeIndex) => (
                  <GridItem key={typeIndex}>
                    <TimeInput
                      This={this}
                      type={type}
                      index={index}
                      valueIndex={typeIndex}
                      timeValue={value[typeIndex]}
                      changeState={ChangeValue}
                    />
                  </GridItem>
                ))}
                <GridItem>
                  <DeleteButton onClick={() => Delete(this, index)}>delete</DeleteButton>
                </GridItem>
              </Grid>)
          }
          return items
        })}
      </AppContainer>
    )
  }
}


export default App;
