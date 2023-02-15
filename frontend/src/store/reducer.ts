const initialState = [
    {
        id: 0,
        title: 'Задача 1',
        info: 'Это описание задачи. Здесь указано как и что нужно сделать'
    },
    {
        id: 1,
        title: 'Задача 2',
        info: 'Это описание задачи. Здесь указано как и что нужно сделать'
    },
]

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case 'TASK_REMOVE':
            return state.filter((task: any) => action.payload.id !== task.id)
        default: 
        return state
    }
}