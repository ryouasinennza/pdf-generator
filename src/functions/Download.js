import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
/**
 * https://pdfmake.github.io/docs/
 * http://pdfmake.org/playground.html
 * @param list
 * @param total
 * @param name
 * @param company
 * @param date
 * @param inkan
 * @constructor
 */
export const Download = (list, total, name, company, date, inkan,) => {

  pdfMake.fonts = {
    GenYoMin: {
      normal: 'GenYoMinJP-Regular.ttf',
      bold: 'GenYoMinJP-Bold.ttf',
    },
  };

  const docDefinition = {
    content: [
      {
        text: `${date} 作業報告書`,
        margin: [2, 0, 0, 10],
        fontSize: 15,
      },
      {
        columns: [
          {
            width: 150,
            height: 30,
            margin: [2, 0, 0, 10],
            text: `${company} ${name}`,
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
          body: list
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
            ['稼働合計', total],
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
}
