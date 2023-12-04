import customFetch from '../../utils/axios'

export const getAllJobsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
