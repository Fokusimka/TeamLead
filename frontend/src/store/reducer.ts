
const initialState: any = []

export default function reducer(state = initialState, action: any) {
    let newArray
    switch(action.type) {
        case 'TASK_REMOVE':
            newArray = state.data.filter((task: any) => action.payload.id !== task.id)
            return { data: newArray }
        case 'TASK_ADD':
            newArray = state.concat(action.payload)
            return { data: newArray }
        case 'TASK_CHECK':
            let stateArray = state.data.map((task: any) => {
                if (task.id === action.payload.id) {
                    task.isChecked = !task.isChecked
                }
                return task
            })
            let arWithoutCheck = stateArray.filter((task: any) => !task.isChecked)
            let arWithCheck = stateArray.filter((task: any) => task.isChecked)
            newArray = arWithoutCheck.concat(arWithCheck)
            return { data: newArray }
        default: 
        return state
    }
}