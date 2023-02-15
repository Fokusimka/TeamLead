import React, { useLayoutEffect } from 'react';

import __noop from '@atlaskit/ds-lib/noop';
import { Checkbox } from '@atlaskit/checkbox';


import './App.css';
import { addTask, removeTask } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch =  useDispatch()
  
  useSelector((itemStore: any) => console.log(itemStore, ' <<<<STORE AF'))
  if (useSelector((itemStore: any) => !itemStore.data)) {
    const data = (document.getElementById('data') as HTMLInputElement).value as any;
    const parsedData = JSON.parse(data).issues
    const initialData = parsedData.map((item: any) => { return {id: item.id, title: item.key, info: item.fields.summary} })
    dispatch(addTask(initialData))
    useSelector((itemStore: any) => console.log(itemStore, ' <<<<STORE'))
  }

  return (
    <div className="App">
      <header className="App-header">
        Teamlead ToDoList
      </header>
      <div className='note'>
        ToDo List
        {useSelector((itemStore: any) => itemStore?.data?.map((ticket: any) => {
          return (
            <div className='ticket' key={ticket.id}>
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
                onClick={() => dispatch(removeTask(ticket.id))} 
              >del {ticket.id}</div>
            </div>
          )
        }))}
      </div>
    </div>
  );
}

export default App;
