webpackJsonp([18],{854:function(n,e,t){var o=t(0),r=t(8),a=t(9).PageRenderer;a.__esModule&&(a=a.default);var i=r({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:t(887)}},componentWillMount:function(){},render:function(){return o.createElement(a,Object.assign({},this.props,{content:this.state.content}))}});i.__catalog_loader__=!0,n.exports=i},887:function(n,e){n.exports="The following example shows how to integrate drag and drop with virtualization.\n\n**Example:**\n\n```jsx\n/*\nimport React from 'react';\nimport { DragDropContext } from 'react-dnd';\nimport HTML5Backend from 'react-dnd-html5-backend';\nimport { cloneDeep, findIndex } from 'lodash';\nimport * as Table from 'reactabular-table';\nimport * as dnd from 'reactabular-dnd';\nimport * as resolve from 'table-resolver';\nimport * as Sticky from 'reactabular-sticky';\nimport * as Virtualized from 'reactabular-virtualized';\n\nimport { generateRows } from './helpers';\n*/\n\nconst columns = [\n  {\n    props: {\n      style: { minWidth: 50 }\n    },\n    header: {\n      label: 'Index'\n    },\n    cell: {\n      formatters: [\n        (value, { rowIndex }) => <span>{rowIndex}</span>\n      ]\n    }\n  },\n  {\n    property: 'name',\n    props: {\n      style: { minWidth: 300 }\n    },\n    header: {\n      label: 'Name'\n    }\n  },\n  {\n    property: 'age',\n    props: {\n      style: { minWidth: 100 }\n    },\n    header: {\n      label: 'Age'\n    }\n  },\n  {\n    property: 'company',\n    props: {\n      style: { minWidth: 400 }\n    },\n    header: {\n      label: 'Company'\n    }\n  },\n  {\n    property: 'product',\n    props: {\n      style: { minWidth: 400 }\n    },\n    header: {\n      label: 'Product'\n    }\n  }\n];\n\nconst schema = {\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    name: {\n      type: 'string'\n    },\n    product: {\n      type: 'string'\n    },\n    company: {\n      type: 'string'\n    },\n    age: {\n      type: 'integer'\n    }\n  },\n  required: ['id', 'name', 'product', 'company', 'age']\n};\n// Resolving indices is an optional step. You can skip it if you don't\n// rely on rowIndex anywhere. But if you do, it's good to calculate and\n// include to the data. Reactabular's rendering logic is able to pick it\n// up by convention (`_index` field).\nconst rows = resolve.resolve({\n  columns,\n  method: resolve.index\n})(generateRows(1000, schema));\n\nclass VirtualizedTable extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      rows,\n      columns\n    };\n\n    this.onRow = this.onRow.bind(this);\n    this.onMoveRow = this.onMoveRow.bind(this);\n\n    this.tableHeader = null;\n    this.tableBody = null;\n  }\n  componentDidMount() {\n    // We have refs now. Force update to get those to Header/Body.\n    this.forceUpdate();\n  }\n  render() {\n    return (\n      <div>\n        <Table.Provider\n          className=\"pure-table pure-table-striped\"\n          columns={columns}\n          components={{\n            body: {\n              wrapper: Virtualized.BodyWrapper,\n              row: dnd.draggableRow(Virtualized.BodyRow)\n            }\n          }}\n        >\n          <Sticky.Header\n            style={{\n              maxWidth: 800\n            }}\n            ref={tableHeader => {\n              this.tableHeader = tableHeader && tableHeader.getRef();\n            }}\n            tableBody={this.tableBody}\n          />\n\n          <Virtualized.Body\n            rows={this.state.rows}\n            rowKey=\"id\"\n            style={{\n              maxWidth: 800\n            }}\n            height={400}\n            ref={tableBody => {\n              this.tableBody = tableBody && tableBody.getRef();\n            }}\n            tableHeader={this.tableHeader}\n            onRow={this.onRow}\n          />\n        </Table.Provider>\n      </div>\n    );\n  }\n  onRow(row) {\n    return {\n      rowId: row.id,\n      onMove: this.onMoveRow\n    };\n  }\n  onMoveRow({ sourceRowId, targetRowId }) {\n    const rows = dnd.moveRows({\n      sourceRowId,\n      targetRowId\n    })(this.state.rows);\n\n    if (rows) {\n      this.setState({ rows });\n    }\n  }\n}\n\n<VirtualizedTable />\n```\n"}});