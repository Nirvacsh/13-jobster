import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'
import { clearValues } from './jobSlice'
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'

export const createJobThunk = async (url, job, thunkAPI) => {
  try {
    const res = await customFetch.post(url, job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(clearValues())
    return res.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })

    thunkAPI.dispatch(getAllJobs())
    return resp.data.msg
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
