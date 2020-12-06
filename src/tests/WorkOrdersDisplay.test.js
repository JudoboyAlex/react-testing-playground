
import * as React from 'react'
import ReactDOM from 'react-dom'
import WorkOrdersDisplay from '../components/WorkOrdersDisplay'

test('renders WorkOrdersDisplay component', () => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<WorkOrdersDisplay />, div)
  console.log(document.body.innerHTML);

})


