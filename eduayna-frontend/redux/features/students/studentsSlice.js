import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchstudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/students`);
    return response.json();
  }
);


export const addStudent = createAsyncThunk(
  "students/addStudent",
 async (title) => {
    const response = await fetch(
     `${process.env.NEXT_PUBLIC_BACKEND}/students`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      }
    );

    return response.json();
  }
);


export const updateStudent = createAsyncThunk(
  "students/updateStudent",
    async ({ id, title }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/students/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      }
    );

    return response.json();
  }
);


export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/students/${id}`,
      {
        method: "DELETE"
      }
    );

    return id;
  }
);

const studentsSlice = createSlice({
  name: "students",

  initialState: {
    students: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(fetchstudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });

    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });
  }
});

const studentsReducer=studentsSlice.reducer;

export default studentsReducer;