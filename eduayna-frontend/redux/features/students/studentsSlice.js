import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchstudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/students`);
    return response.json();
  },
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/students`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      },
    );
    const value = await response.json();
    return value;
  },
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, title }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/students/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      },
    );

    return response.json();
  },
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/students/${id}`, {
      method: "DELETE",
    });

    return id;
  },
);

const studentsSlice = createSlice({
  name: "students",

  initialState: {
    students: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchstudents.pending, (state, action) => {
      state.loading = true;
      state.addError = false;
    });
    builder.addCase(fetchstudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });
    builder.addCase(fetchstudents.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message || "Failed to add task";
    });

    builder
      .addCase(addStudent.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })

      .addCase(addStudent.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addError = null;

        state.students.push(action.payload);
      })

      .addCase(addStudent.rejected, (state, action) => {
        state.addLoading = false;

        state.addError = action.error.message || "Failed to add task";
      });
  },
});

const studentsReducer = studentsSlice.reducer;

export default studentsReducer;
