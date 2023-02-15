
const initialState: any = []

export default function reducer(state = initialState, action: any) {
    console.log(state, ' <<<STATE on REDUCE')
    let newArray
    switch(action.type) {
        case 'TASK_REMOVE':
            newArray = state.data.filter((task: any) => action.payload.id !== task.id)
            return {data: newArray}
        case 'TASK_ADD':
            newArray = state.concat(action.payload)
            return {data: newArray}
        default: 
        return state
    }
}