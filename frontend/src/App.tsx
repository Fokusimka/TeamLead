import React from 'react';

import __noop from '@atlaskit/ds-lib/noop';
import { Checkbox } from '@atlaskit/checkbox';


import './App.css';
import { removeTask } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch =  useDispatch()
  return (
    <div className="App">
      <header className="App-header">
        Teamlead ToDoList
      </header>
      <div className='note'>
        ToDo List
        {useSelector((itemStore: any) => itemStore.map((ticket: any, index: number) => {
          return (
            <div className='ticket'>
              <Checkbox
                value=""
                onChange={__noop}
                name="checkbox-default"
                testId="cb-default"
              />
              <span>{ticket.title}</span>
              <span>{ticket.info}</span>
              <div
                className='deleteIcon'
                onClick={() => dispatch(removeTask(index))} 
              >{index}</div>
            </div>
          )
        }))}
      </div>
    </div>
  );
}

export default App;
