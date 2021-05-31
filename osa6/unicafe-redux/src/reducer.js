const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const res = { ...state }
  switch (action.type) {
    case 'GOOD':
      res.good += 1
      return res
    case 'OK':
      res.ok += 1
      return res
    case 'BAD':
      res.bad += 1
      return res
    case 'ZERO':
      res.good = 0
      res.ok = 0
      res.bad = 0
      return res
    default: return state
  }
  
}

export default counterReducer