import { createSlice } from "@reduxjs/toolkit"; 

const initialState = [];
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({ 
        id: Date.now(), 
        name: action.payload.name, 
        completed: false, 
        dueDate: action.payload.dueDate || "" 
      });
    },

    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, toggleTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
