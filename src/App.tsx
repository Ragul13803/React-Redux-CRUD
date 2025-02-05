import { Provider } from "react-redux"
import { Customers } from "./Components/Customers"
import store from "./Store"


export const App = () => {
  return (
    <>
    <h1 style={{paddingLeft:'400px', fontFamily:'cursive'}}>Simple CRUD in Customers</h1>
    <Provider store={store}>
      <Customers />
    </Provider>
    </>
  )
}