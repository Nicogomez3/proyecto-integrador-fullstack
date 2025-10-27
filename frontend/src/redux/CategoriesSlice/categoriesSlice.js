import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: ['Todo', 'Muebles', 'Iluminación', 'Decoración', 'Electrodomésticos'],
    selectedCategory: 'Todo',
}


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.categories = action.payload;
        },
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
});

export const { setCategory, selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;