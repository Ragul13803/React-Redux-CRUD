import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Customer type
export interface Customer {
  Name: string;
  Age: string;
  Gender: string;
  Mobile: string;
}

// Define the state type (an array of Customer objects)
type CustomerState = Customer[];

// Initial state as an empty array
const initialState: CustomerState = [];

// Create slice with strongly typed state and actions
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Add customer action with a payload of type Customer
    addCustomer(state, action: PayloadAction<Customer>) {
      state.push(action.payload);
    },
    // Delete customer action with a payload of type string (assuming inputName for deletion)
    deleteCustomer(state, action: PayloadAction<string>) {
      const deleteIndex = action.payload;
      console.log('deleteIndex',deleteIndex);
      return state.filter((index: any) =>  index !== deleteIndex)
    },
    updateCustomer(state, action: PayloadAction<{ index: number; customer: Customer }>) {
      const { index, customer } = action.payload;
      state[index] = customer; // Update customer at the given index
    },
    
  },
});

// Export actions and reducer
export const { addCustomer, deleteCustomer, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer;
