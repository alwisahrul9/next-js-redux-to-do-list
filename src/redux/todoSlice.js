import { createSlice } from "@reduxjs/toolkit"

const getFromLocalStorage = JSON.parse(localStorage.getItem('todos'))

const todoSlice = createSlice({
    name: 'todos',
    initialState: getFromLocalStorage || [], // inisialisasi state
    reducers: {
        // state = initialState, action = tindakan yang dilakukan
        addTodo: (state, action) => {
            state.push({
                id: Math.random(),
                activity: action.payload,
                complete: false
            })
            localStorage.removeItem('todos')
            localStorage.setItem('todos', JSON.stringify(state))
        },
        changeComplete: (state, action) => {
            // Ubah complete menjadi true / false jika action.payload == id atau jika tidak maka tetap apa adanya
            let change = state.map(t => t.id == action.payload ? {...t, complete: !t.complete} : t)
            localStorage.removeItem('todos')
            localStorage.setItem('todos', JSON.stringify(change))
            return change
        },
        reorderTodos: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;

            if (destinationIndex === undefined || destinationIndex === null) {
                return state; // Jika tidak ada tujuan, urutan tidak berubah
            }

            const updatedState = Array.from(state);
            const [movedItem] = updatedState.splice(sourceIndex, 1); // Hapus elemen dari posisi asal
            updatedState.splice(destinationIndex, 0, movedItem); // Masukkan elemen ke posisi baru

            localStorage.removeItem('todos');
            localStorage.setItem('todos', JSON.stringify(updatedState));
            return updatedState;
        },
        deleteTodo: (state, action) => {
            let remove = state.filter(t => t.id != action.payload)
            localStorage.removeItem('todos')
            localStorage.setItem('todos', JSON.stringify(remove))
            return remove
        }
    }
})

export const { addTodo, deleteTodo, changeComplete, reorderTodos } = todoSlice.actions
export default todoSlice.reducer
