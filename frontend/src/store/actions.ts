
export const removeTask = (id: any) => ({
    type: 'TASK_REMOVE',
    payload: { id }
  })

export const addTask = (newData: any) => ({
  type: 'TASK_ADD',
  payload: newData
})

export const setChecked = (id: number) => ({
  type: 'TASK_CHECK',
  payload: { id }
})

export const addProject = (newProject: any) => ({
  type: 'PROJECT_ADD',
  payload: newProject
})

export const changeProject = (project: any) => ({
  type: 'PROJECT_CHANGE',
  payload: project
})