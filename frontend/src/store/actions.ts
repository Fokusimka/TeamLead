
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