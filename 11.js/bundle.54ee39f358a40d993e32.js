webpackJsonp([11],{846:function(n,e,t){var o=t(0),a=t(8),s=t(9).PageRenderer;s.__esModule&&(s=s.default);var i=a({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:t(879)}},componentWillMount:function(){},render:function(){return o.createElement(s,Object.assign({},this.props,{content:this.state.content}))}});i.__catalog_loader__=!0,n.exports=i},879:function(n,e){n.exports="[![build status](https://secure.travis-ci.org/reactabular/column-extensions.svg)](http://travis-ci.org/reactabular/column-extensions) [![bitHound Score](https://www.bithound.io/github/reactabular/column-extensions/badges/score.svg)](https://www.bithound.io/github/reactabular/column-extensions) [![codecov](https://codecov.io/gh/reactabular/column-extensions/branch/master/graph/badge.svg)](https://codecov.io/gh/reactabular/column-extensions)\n\n# reactabular-column-extensions - Syntax extensions for Reactabular\n\n*reactabular-column-extensions* provide syntax extensions for Reactabular column definition. Instead of typing out import and the related code, this takes some of that work away. You still have to connect the data processing portion, though.\n\n## API\n\nThe API provides a **bind** function that merges the given **extensions** together with the provided column definition.\n\n```javascript\nimport * as extensions from 'reactabular-column-extensions';\n\n// Or you can cherry-pick\nimport { bind } from 'sortabular';\nimport { bind as bindExtensions } from 'sortabular';\n```\n\n### Binding\n\n**`extensions.bind([<extension>]) => ([<column>]) => [<adjusted column>]`**\n\nThe binder accepts an array of extensions and a column definition. It adjusts the columns based on this information and merges the configuration emitted by extensions top to bottom.\n\nAn extension has to be an object like this:\n\n```javascript\n{\n  match(column) {\n    // If a column has `demo` property set, evaluate and merge\n    return column.demo;\n  },\n  evaluate(column) {\n    // Emit a structure to attach to the column definition\n    return {\n      demo: true\n    }\n  }\n}\n```\n\n> If you want to implement a custom extension, you can wrap the object to a function and set defaults there.\n\n### Extensions\n\n**`extensions.draggableHeader({ onMoveColumns: <function> }) => <extension>`**\n\n`draggableHeader` injects the configuration expected by `reactabular-dnd` if `header.draggable` is set. You still have to configure the rest, though.\n\n**`extensions.highlightCell() => <extension>`**\n\n`highlightCell` injects the configuration expected by highlighting functionality from `searchtabular` if `cell.highlight` is set. You have to connect the highlighting logic with your data processing to make this work.\n\n**`extensions.resizableHeader({ window, onDragColumnStart, onDragColumn, onDragColumnEnd, props }) => <extension>`**\n\n`resizableHeader` injects the configuration required for resizable headers if `header.resizable` is set. It accepts `window` so you can make resizing work in an iframe. Most often you don't need to touch the parameter, though. You should define `onDragColumn(width, { column }` handler and deal with the new width there. `reactabular-resizable` can be useful for that purpose. `props` allow you to inject custom styling/props to `resizable.column`.\n\n**`extensions.sortableHeader({ sortingColumns, onSort, props, strategy }) => <extension>`**\n\n`sortableHeader` is a light wrapper to `sortabular` that gets injected if `header.sortable` is set. It sets logic and user interface needed for altering sorting state. It also injects sort reset transform. `sortingColumns`, `onSort(sortingColumns)`, `props`, and `strategy` follow `sortabular` interface. `props` allow you to customize styling/props of `sortabular.sort`.\n\n**`extensions.toggleChildrenCell({ idField, parentField, onToggleShowingChildren, props, rows }) => <extension>`**\n\n`toggleChildrenCell` gets injected if `cell.toggleChildren` is set. It has been designed to work with nested tree data of `treetabular`. It allows you to customize tree `idField` and `parentField`. In addition you have to define what happens when children are toggled using `onToggleShowingChildren(rowIndex)`. If you want to customize `treetabular.toggleChildren`, you can pass `props` to it. The extension also expects you to pass the rows of your application to it.\n\n## Column Extension Example\n\nThe example below shows how the transformation works.\n\n**Example:**\n\n```jsx\n/*\nimport * as extensions from 'reactabular-column-extensions';\n*/\n\nconst columns = [\n  {\n    property: 'color',\n    header: {\n      label: 'Color',\n      draggable: true\n    }\n  },\n  {\n    property: 'name',\n    header: {\n      label: 'Name'\n    },\n    cell: {\n      highlight: true\n    }\n  }\n];\n\nconst extendedColumns = extensions.bind([\n  extensions.draggableHeader({\n    onMoveColumns: () => ({})\n  }),\n  extensions.highlightCell()\n])(columns);\n\n<ul>{\n  (extendedColumns).map((d, i) =>\n    <li key={`value-${i}`}>{JSON.stringify(d, null, 2)}</li>\n  )\n}</ul>\n```\n\n## License\n\nMIT.\n"}});