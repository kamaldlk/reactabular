webpackJsonp([8],{858:function(e,n,t){var o=t(0),r=t(8),a=t(9).PageRenderer;a.__esModule&&(a=a.default);var s=r({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:t(891)}},componentWillMount:function(){},render:function(){return o.createElement(a,Object.assign({},this.props,{content:this.state.content}))}});s.__catalog_loader__=!0,e.exports=s},891:function(e,n){e.exports="[![build status](https://secure.travis-ci.org/reactabular/selectabular.svg)](http://travis-ci.org/reactabular/selectabular) [![bitHound Score](https://www.bithound.io/github/reactabular/selectabular/badges/score.svg)](https://www.bithound.io/github/reactabular/selectabular) [![codecov](https://codecov.io/gh/reactabular/selectabular/branch/master/graph/badge.svg)](https://codecov.io/gh/reactabular/selectabular)\n\n# Selectabular - Selection utilities\n\nCommon functionalities when dealing with table rows.\n- (De)-Selecting\n- Filtering\n- Toggling\n\n## API\n\n```javascript\nimport * as select from 'selectabular';\n\n// Or you can cherry-pick\nimport { all } from 'selectabular';\nimport { all as selectAll } from 'selectabular';\n```\n\n### `select.all(rows) => [<row>]`\n\n- Returned `rows` is an array where each row has a `.selected=true` attribute\n\n### `select.none(rows) => [<row>]`\n\n- Returned `rows` is an array where each row has a `.selected=false` attribute\n\n### `select.rows(filter)(rows) => { rows: [<row>], selectedRows: [<matchingRow>]}`\n\nGiven a filter, it will select the matching rows and return them:\n\n```javascript\nconst initRows = [\n  { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },\n  { id: 11, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },\n  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },\n  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }\n];\nconst myfilter = row => row.price > 5\nconst {rows, selectedRows: result } = selectabular.rows(myfilter)(initRows);\n>> result\n[\n  { id: 12,  product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },\n  { id: 13,  product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }\n];\n>> rows\n[\n  { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },\n  { id: 11, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },\n  { id: 12, selected: true, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },\n  { id: 13, selected: true, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }\n];\n```\n\n**Important!**\n\n- `rows` does *not* toggle the rows that do not match the filter; please use `select.none` a priori for that.\n- As shown in the example, `rows`, and `selectedRows` are internal variable names, used in the implementation; which can be easily renamed inline (See example where `selectedRows` is renamed to `result`)\n\n### `select.toggle(filter)(rows) => [<row>]`\n\n- Input rows where each filter-matching row is toggled its `selected` attribute.\n\n```javascript\nconst initRows = [\n  { id: 10, selected: false, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },\n  { id: 11, selected: true, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },\n  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },\n  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }\n];\nconst filter = row => row.id < 12\nconst result = selectabular.toggle(filter)(initRows);\n >> result\n[\n  { id: 10, selected: true, product: 'apple', company: 'Apple Inc', price: 1.5, stock: 300 },\n  { id: 11, selected: false, product: 'pear', company: 'Pear Inc', price: 3, stock: 1000 },\n  { id: 12, product: 'grape', company: 'Grapesoft', price: 22.1, stock: 18 },\n  { id: 13, product: 'banana', company: 'Banana Tech', price: 12, stock: 9 }\n];\n```\n\n## React Helpers\n\n### Selecting by Arrow Keys\n\nThere's a single React specific helper that makes it easier to track up/down arrows. The API consists of a single higher order function: `select.byArrowKeys({ rows: <rows>, selectedRowIndex: <number>, onSelectRow: (selectedRowIndex) => <any>})(<React element>) => <React element>`\n\nIf there is a selection (`selectedRowIndex`), then it triggers `onSelectRow` with the new `selectedRowIndex` which you can then use to update your selection state.\n\n### How to Use?\n\nThe following example illustrates how to use the functionality with a Reactabular based table. Selection is tracked per row to comply with Reactabular's strict `shouldComponentUpdate`. This allows it to tell apart the rows that have changed while maintaining good performance.\n\nYou can select a row by clicking in the following example. If there's a selection, you can move up and down using the arrow keys.\n\n```jsx\n/*\nimport React from 'react';\nimport classnames from 'classnames';\nimport cloneDeep from 'lodash/cloneDeep';\nimport find from 'lodash/find';\nimport findIndex from 'lodash/findIndex';\nimport { compose } from 'redux';\nimport * as Table from 'reactabular-table';\nimport * as select from 'selectabular';\n*/\n\nconst rows = [\n  {\n    id: 100,\n    name: 'Adam',\n    age: 55\n  },\n  {\n    id: 102,\n    name: 'Joe',\n    age: 12\n  },\n  {\n    id: 101,\n    name: 'Brian',\n    age: 62\n  },\n  {\n    id: 103,\n    name: 'Mike',\n    age: 22\n  },\n  {\n    id: 104,\n    name: 'Jack',\n    age: 33\n  }\n];\n\nconst columns = [\n  {\n    property: 'name',\n    header: {\n      label: 'Name'\n    }\n  },\n  {\n    property: 'age',\n    header: {\n      label: 'Age'\n    }\n  }\n];\n\nclass SelectionTable extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      rows,\n      columns,\n      selectedRows: []\n    };\n\n    this.onRow = this.onRow.bind(this);\n    this.onSelectRow = this.onSelectRow.bind(this);\n    this.getSelectedRowIndex = this.getSelectedRowIndex.bind(this);\n  }\n  render() {\n    const { columns, rows, selectedRows } = this.state;\n    const selectedRowIndex = this.getSelectedRowIndex(selectedRows);\n\n    return select.byArrowKeys({\n      rows,\n      selectedRowIndex,\n      onSelectRow: this.onSelectRow\n    })(\n      <div>\n        <Table.Provider\n          className=\"pure-table pure-table-striped\"\n          columns={columns}\n        >\n          <Table.Header />\n\n          <Table.Body\n            rows={rows}\n            rowKey=\"id\"\n            onRow={this.onRow}\n          />\n\n          <tfoot>\n            <tr>\n              <td>Selected: {selectedRows[0] && selectedRows[0].name}</td>\n              <td></td>\n            </tr>\n          </tfoot>\n        </Table.Provider>\n      </div>\n    );\n  }\n  onRow(row, { rowIndex }) {\n    return {\n      className: classnames(\n        rowIndex % 2 ? 'odd-row' : 'even-row',\n        row.selected && 'selected-row'\n      ),\n      onClick: () => this.onSelectRow(rowIndex)\n    };\n  }\n  onSelectRow(selectedRowIndex) {\n    const { rows } = this.state;\n    const selectedRowId = rows[selectedRowIndex].id;\n\n    this.setState(\n      compose(\n        select.rows(row => row.id === selectedRowId),\n        select.none\n      )(rows)\n    );\n  }\n  getSelectedRowIndex(selectedRows) {\n    return findIndex(this.state.rows, {\n      id: selectedRows[0] && selectedRows[0].id\n    });\n  }\n}\n\n<SelectionTable />\n```\n\n## License\n\nMIT. See LICENSE for details.\n"}});