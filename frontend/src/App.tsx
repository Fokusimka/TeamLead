import React from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import Page from '@atlaskit/page';
import TrashIcon from '@atlaskit/icon/glyph/trash'
import FilterIcon from '@atlaskit/icon/glyph/filter'

import './App.css';
import { addTask, removeTask, setChecked } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch =  useDispatch()
  
  if (useSelector((itemStore: any) => !itemStore.data)) {
    const data = (document.getElementById('data') as HTMLInputElement).value as any;
    const parsedData = JSON.parse(data).issues
    const initialData = parsedData.map((item: any) => { 
      return {
        id: item.id,
        title: item.key,
        info: item.fields.summary,
        description: item.fields.description.content[0].content,
        isChecked: false,
      } 
    })
    dispatch(addTask(initialData))
  }

  const onChange = React.useCallback((id: number) => {
    dispatch(setChecked(id))
  }, []);

  const [filtered, setFiltered] = React.useState(false)

  function getNoteClasses(ticket: any) {
    if (ticket.isChecked) {
      return 'ticket activeTicket'
    } else {
      if (filtered) {
        return 'hideTicket'
      }
      return 'ticket'
    }
  }

  return (
    <div className='App'>
      <h1>TodoList Tasks</h1>
      <Page>
          <div className='note'>
            <div className='noteHeader'>
              TO DO {useSelector((itemStore: any) => itemStore.data.length)} ISSUES 
              <div 
                className={filtered ? 'noteHeaderFilter noteHeaderFilterActive' : 'noteHeaderFilter'}
                onClick={() => setFiltered(!filtered)}
              >
                <FilterIcon label=''/>
              </div>
            </div>
            {useSelector((itemStore: any) => itemStore?.data?.map((ticket: any) => {
              return (
                <div className={getNoteClasses(ticket)} key={ticket.id}>
                  <div className='ticketCheckBox'>
                    <Checkbox
                      onChange={() => onChange(ticket.id)}
                    />
                  </div>
                  <div className='ticketInfo'>
                    <div><span className='ticketTitle'>{ticket.title}</span> {ticket.info}</div>
                    {ticket.description.map((item: any) => (<span>{item.text}</span>))}
                  </div>
                  <div
                    className='deleteContainer'
                    onClick={() => dispatch(removeTask(ticket.id))} 
                  ><TrashIcon label='' /></div>
                </div>
              )
            }))}
          </div>
      </Page>
    </div>
  );
}

export default App;
