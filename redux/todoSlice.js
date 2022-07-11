import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getTodosAsync = createAsyncThunk(
  "todos/getTodoAsync",
  async () => {
    const response = await fetch(
      "https://62c49978abea8c085a791e23.mockapi.io/todos"
    )
    if (response.ok) {
      const todos = await response.json()
      return todos
    }
  }
)

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const response = await fetch(
      "https://62c49978abea8c085a791e23.mockapi.io/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
          deadline: payload.deadline,
          completed: false,
        }),
      }
    )
    if (response.ok) {
      const todo = await response.json()
      return { todo }
    }
  }
)

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload) => {
    const resp = await fetch(
      "https://62c49978abea8c085a791e23.mockapi.io/todos/:id",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ completed: payload.completed }),
        body: JSON.stringify({ completed: true }),
      }
    )

    if (resp.ok) {
      console.log("sadsa")
      const todo = await resp.json()
      return { todo }
    }
  }
)

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const resp = await fetch(
      "https://62c49978abea8c085a791e23.mockapi.io/todos/:id",
      {
        method: "DELETE",
      }
    )

    if (resp.ok) {
      return { id: payload.id }
    }
  }
)

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: 1,
      title: "First todo",
      description: "This is first todo",
      deadline: "13.7. 2022",
      completed: false,
    },
    {
      id: 2,
      title: "Second todo",
      description: "This is 2 todo",
      deadline: "14.7. 2022",
      completed: false,
    },
  ],

  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        deadline: action.payload.deadline,
        completed: false,
      }
      state.push(newTodo)
    },

    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index].completed = action.payload.completed
    },

    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id)
    },

    noFilter: (state, action) => {
      return state
    },

    activeFilter: (state, action) => {
      return state.filter((todo) => !todo.completed)
    },

    doneFilter: (state, action) => {
      return state.filter((todo) => todo.completed)
    },

    searchFilter: (state, action) => {
      return state.filter((todo) =>
        todo.title.startsWith(action.payload.search)
      )
    },

    extraReducers: {
      [getTodosAsync.pending]: (state, action) => {
        console.log("fetching data")
      },

      [getTodosAsync.fulfilled]: (state, action) => {
        console.log("fetched!")
        return action.payload.todos
      },

      [addTodoAsync.fulfilled]: (state, action) => {
        state.push(action.payload.todo)
      },

      [toggleCompleteAsync.fulfilled]: (state, action) => {
        const index = state.findIndex(
          (todo) => todo.id === action.payload.todo.id
        )
        state[index].completed = action.payload.todo.completed
      },

      [deleteTodoAsync.fulfilled]: (state, action) => {
        return state.filter((todo) => todo.id !== action.payload.id)
      },
    },
  },
})

export const {
  addTodo,
  toggleComplete,
  deleteTodo,
  doneFilter,
  activeFilter,
  noFilter,
  searchFilter,
} = todoSlice.actions

export default todoSlice.reducer
