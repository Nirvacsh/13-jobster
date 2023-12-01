import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'
import { clearValues } from './jobSlice'

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
