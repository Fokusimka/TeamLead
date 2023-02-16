import React, { Fragment } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import Page from '@atlaskit/page';
import TrashIcon from '@atlaskit/icon/glyph/trash'
import FilterIcon from '@atlaskit/icon/glyph/filter'
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
} from '@atlaskit/form';
import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import Select, { ValueType } from '@atlaskit/select';

import './App.css';
import { addProject, addTask, changeProject, removeTask, setChecked } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch =  useDispatch()
  
  if (useSelector((itemStore: any) => !itemStore.data)) {
    const projects = (document.getElementById('projects') as HTMLInputElement).value as any;
    const parsedProjects = JSON.parse(projects).values
    const initialProjects = parsedProjects.map((item: any) => {
      return {
        name: item.name,
        key: item.key
      }
    })
    dispatch(addProject(initialProjects))

    const data = (document.getElementById('data') as HTMLInputElement).value as any;
    const parsedData = JSON.parse(data).issues
    const initialData = parsedData.map((item: any) => { 
      return {
        id: item.id,
        title: item.key,
        info: item.fields.summary,
        description: item.fields.description?.content[0].content || [],
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

  interface Option {
    label: string;
    value: string;
  }

  const projects = useSelector((itemStore: any) => itemStore.projects.map((project: any) => { 
    return { label: project.name, value: project.key }
  }))

  return (
    <div className='App'>
      <h1>TodoList Tasks</h1>
      <Page>
        <div className='content'>
          <div className='note'>
            <div className='noteHeader'>
              <span>TO DO {useSelector((itemStore: any) => itemStore.data.length)} ISSUES </span>
              {/* <span>PROJ</span> */}
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
                    {ticket.description.map((item: any) => (<span className='ticketDescription'>{item.text}</span>))}
                  </div>
                  <div
                    className='deleteContainer'
                    onClick={() => dispatch(removeTask(ticket.id))} 
                  ><TrashIcon label='' /></div>
                </div>
              )
            }))}
          </div>
          <div className='form'>
          <Form<{ project: string }>
            onSubmit={(data) => { data.project && dispatch(changeProject(data.project)) }}
          >
            {({ formProps }) => (
              <form {...formProps}>
                <FormHeader
                  title="Выбор проекта"
                />
                <FormSection>
                <Field<ValueType<Option>> name="project" label="Выберете проект">
                  {({ fieldProps: { id, ...rest }, error }) => (
                    <Fragment>
                      <Select<Option>
                        inputId={id}
                        {...rest}
                        placeholder="Выберете проект"
                        options={projects}
                      />
                      {error && <ErrorMessage>{error}</ErrorMessage>}
                    </Fragment>
                  )}
                </Field>
                </FormSection>

                <FormFooter>
                  <ButtonGroup>
                    <LoadingButton
                      type="submit"
                      appearance="primary"
                    >
                      Отправить
                    </LoadingButton>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>
          </div>
        </div>
      </Page>
    </div>
  );
}

export default App;
