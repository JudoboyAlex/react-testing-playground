
import * as React from 'react'
import ReactDOM from 'react-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import WorkOrdersDisplay from '../components/WorkOrdersDisplay'

/* 
Testing React Using Jest
// test('renders WorkOrdersDisplay component', () => {
//   const div = document.createElement('div')
//   document.body.append(div)
//   ReactDOM.render(<WorkOrdersDisplay />, div)
//   console.log(document.body.innerHTML);
//   const message = div.querySelector('ul')
//   console.log(message);
// })
*/

// Testing React Using React Testing Library
test('renders WorkOrdersDisplay component with RTL', () => {
  render(<WorkOrdersDisplay/>)
  // const view = container.querySelector(".workOrderDetails")
  const view = screen.queryAllByText('listitem')
  console.log(view)
})


