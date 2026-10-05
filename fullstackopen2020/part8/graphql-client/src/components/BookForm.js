import React, {useState} from 'react'
import { useMutation } from '@apollo/client';
import { ALL_BOOKS, CREATE_BOOK} from './queries-books'

const BookForm = ({ setError, updateCacheWith }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genres, setGenres] = useState('')
  
    const [ createBook ] = useMutation(CREATE_BOOK, {
        refetchQueries: [  {query: ALL_BOOKS } ],
        onError: (error) => {
          if (error.graphQLErrors && error.graphQLErrors[0]) {
            setError(error.graphQLErrors[0].message)
          } else {
            setError(error.message)
          }
        },
        update: (store, response) => {
          console.log('createBook: ', response.data.bookAdded)
          updateCacheWith(response.data.bookAdded)
        }
    })
  
    const submit = async (event) => {
      event.preventDefault()
  
      await createBook({  variables: { title, author, "published": Number(published), genres } })
  
      setTitle('')
      setAuthor('')
      setPublished('')
      setGenres('')
      setError('Successfully Saved Book')
    }
  
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={submit}>
          <div>
            title <input value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author <input value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            published <input value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </div>
          <div>
            genres <input value={genres}
              onChange={({ target }) => setGenres(target.value)}
            />
          </div>
          <button type='submit'>add!</button>
        </form>
      </div>
    )
  }
  
  export default BookForm
