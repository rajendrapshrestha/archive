import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

  const reducer = combineReducers({
    notification: notificationReducer,
    user: loginReducer,
    blogs: blogReducer
  })

  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

  export default store