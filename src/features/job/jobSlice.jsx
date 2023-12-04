import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createJobThunk } from './jobThunk'
import { toast } from 'react-toastify'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { deleteJobThunk } from './jobThunk'

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
}

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    return createJobThunk('/jobs', job, thunkAPI)
  }
)

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    return deleteJobThunk(jobId, thunkAPI)
  }
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success('Job Created')
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { handleChange, clearValues } = jobSlice.actions
export default jobSlice.reducer
