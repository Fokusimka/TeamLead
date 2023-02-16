const initialState: any = {}

export default function reducer(state = initialState, action: any) {
    let newArray, newProject: any
    switch(action.type) {
        case 'TASK_REMOVE':
            newArray = state.data.filter((task: any) => action.payload.id !== task.id)
            return { data: newArray, projects: state.projects, allTasks: state.allTasks }

        case 'TASK_ADD':
            newProject = state.projects[0].key
            newArray = action.payload.filter((task: any) => task.title.includes(newProject))
            return { data: newArray, projects: state.projects, allTasks: action.payload }

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
            return { data: newArray, projects: state.projects, allTasks: state.allTasks  }

        case 'PROJECT_ADD':
            newArray = action.payload
            return { data: state.data, projects: action.payload, allTasks: state.allTasks }

        case 'PROJECT_CHANGE': 
            newArray = state.allTasks.filter((task: any) => task.title.includes(action.payload.value))
            return { data: newArray, projects: state.projects, allTasks: state.allTasks }

        default: 
        return state
    }
}