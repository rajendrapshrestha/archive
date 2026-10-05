import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries-books'

const Authors = ({setError}) => {
    const [authors, setAuthors] = useState(null)
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const result = useQuery(ALL_AUTHORS)

    useEffect(() => {
        if (result.data) {
            setAuthors(result.data.allAuthors)
        }
      }, [result])

      const [ changeBorn ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [  {query: ALL_AUTHORS } ],
        onError: (error) => {
          if (error.graphQLErrors && error.graphQLErrors[0]) {
            setError(error.graphQLErrors[0].message)
          } else {
            setError(error.message)
          }
        }
      })

      const submit = async (event) => {
        event.preventDefault()
    
        changeBorn({ variables: { name, setBornTo: Number(born) } })
    
        setName('')
        setBorn('')
      }
       
    return (
      <div>
        <h2>Authors</h2>
            <table>
                <thead>
                <tr>
                    <td></td>
                    <td>born</td>
                    <td>books</td>
                </tr>
                </thead>
                <tbody>
            
        {authors && authors.map(p =>
            <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.born}</td>
                <td>{p.bookCount}</td>
            </tr>  
        )}
        </tbody>
        </table>

        <h2> Set birthyear</h2>
        <form onSubmit={submit}>
        <div>
          name 
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors && authors.map(p =>
              <option key={p.name} value={p.name}>{p.name}</option>
            )}
          </select>
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>change number</button>
      </form>
      </div>
    )
    }
    
    export default Authors