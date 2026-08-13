import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchstudents = createAsyncThunk(
  "students/fetchStudents",
async (_,{rejectWithValue}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/students`);
    const value=await response?.json();
    console.log(value)
     if(response?.ok){
      return value
    }
    else{
     return rejectWithValue(
          value.message || "Failed to fetch student"
        );
    }
  },
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (data,{rejectWithValue}) => {
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
    if(response?.ok){
      return value
    }
    else{
     return rejectWithValue(
          value.message || "Failed to add student"
        );
    }
   
  },
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, data },{rejectWithValue}) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/students/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      },
    );
 const value=await response?.json();
    if(response?.ok){
      return value
    }
    else{
     return rejectWithValue(
          value.message || "Failed to add student"
        );
    }
  },
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id,{rejectWithValue}) => {
   const response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/students/${id}`, {
      method: "DELETE",
    });
 const value=await response?.json();
    if(response?.ok){
      return value
    }
    else{
     return rejectWithValue(
          value.message || "Failed to add student"
        );
    }
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
    deleteError:null,
    deleteLoading:false,
    updateLoading:false,
    updateError:null,
      selectedClasses: [],
  selectedStatuses: [],
      search: "",
  },

  reducers: { setSearch: (state, action) => {
      state.search = action.payload;
    },
   toggleClassFilter: (state, action) => {
    const className = action.payload;

    if (state.selectedClasses.includes(className)) {
      state.selectedClasses = state.selectedClasses.filter(
        (item) => item !== className
      );
    } else {
      state.selectedClasses.push(className);
    }
  },

  toggleStatusFilter: (state, action) => {
    const status = action.payload;

    if (state.selectedStatuses.includes(status)) {
      state.selectedStatuses = state.selectedStatuses.filter(
        (item) => item !== status
      );
    } else {
      state.selectedStatuses.push(status);
    }
  },

  clearFilters: (state) => {
    state.selectedClasses = [];
    state.selectedStatuses = [];
  },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchstudents.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchstudents.fulfilled, (state, action) => {
       state.loading = false;
        state.error = null;
      state.students = action.payload;
    });
    builder.addCase(fetchstudents.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message || "Failed to add student";
    });

    builder
      .addCase(addStudent.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })

      .addCase(addStudent.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addError = null;
         console.log(action.payload)
        state.students.push(action?.payload?.student);
      })

      .addCase(addStudent.rejected, (state, action) => {
        state.addLoading = false;

        state.addError = action.error.message || "Failed to add student";
      });

      builder.addCase(deleteStudent.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })

      builder.addCase(deleteStudent.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = null;
        console.log(action.payload)
       state.students = state.students.filter(
  (student) =>
    Number(student?.id) !== Number(action?.payload?.id)
);
      })

      builder.addCase(deleteStudent.rejected, (state, action) => {
        state.deleteLoading = false;

        state.deleteError = action.error.message || "Failed to add student";
      });

      builder
  builder.addCase(updateStudent.pending, (state) => {
    state.updateLoading = true;
    state.updateError = null;
  })

  builder.addCase(
    updateStudent.fulfilled,
    (state, action) => {
      state.updateLoading = false;
      state.updateError = null;

      const updatedStudent =
        action.payload?.student ||
        action.payload;

      const index =
        state.students.findIndex(
          (student) =>
            student.id ===
            updatedStudent.id
        );

      if (index !== -1) {
        state.students[index] =
          updatedStudent;
      }
    }
  )

 builder.addCase(
    updateStudent.rejected,
    (state, action) => {
      state.updateLoading = false;

      state.updateError =
        action.payload ||
        action.error.message ||
        "Failed to update student";
    }
  );
  },
});
export const { setSearch, toggleClassFilter,toggleStatusFilter,clearFilters, } = studentsSlice.actions;
const studentsReducer = studentsSlice.reducer;

export default studentsReducer;
