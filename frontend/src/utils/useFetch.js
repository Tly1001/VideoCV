import React from 'react'


const initialState = {
  data: null,
  error: null,
  loading: true
}

//! REUSABLE CUSTOM HOOK TO HANDLE GET REQUESTS AND SET STATE 
function useFetch(request, params = null) {
  const [state, setState] = React.useState(initialState)
  const getData = React.useCallback(
    async () => {
      try {
        const { data } = await request(params)
        setState({ data, loading: false, error: null })
      } catch (err) {
        setState({ error: true, loading: false, data: null })
      }
    }, [request, params])
  React.useEffect(() => {
    getData()
  }, [getData])
  const refetchData = () => {
    setState(initialState)
    getData()
  }
  return {
    ...state,
    refetchData
  }
}

export default useFetch