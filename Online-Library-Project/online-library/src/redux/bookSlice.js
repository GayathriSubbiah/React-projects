import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books: [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      category: 'Fiction',
      description: 'A story of racial injustice and the destruction of innocence.',
      rating: 4.5
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      category: 'Sci-Fi',
      description: 'A dystopian novel about totalitarianism and surveillance.',
      rating: 4.7
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      category: 'Fiction',
      description: 'A story of wealth, love, and the American Dream in the 1920s.',
      rating: 4.3
    },
    {
      id: 4,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      category: 'Non-Fiction',
      description: 'A popular science book about cosmology.',
      rating: 4.6
    }
  ],
  categories: ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Mystery', 'Biography']
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    }
  }
})

export const { addBook } = booksSlice.actions
export default booksSlice.reducer