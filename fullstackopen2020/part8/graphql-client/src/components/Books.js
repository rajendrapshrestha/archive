import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from './queries-books'

const Books = () => {
  const [books, setBooks] = useState(null)
    const result = useQuery(ALL_BOOKS)

    useEffect(() => {
      if (result.data) {
          setBooks(result.data.allBooks)
      }
    }, [result])
       
    return (
      <div>
        <h2>Books</h2>
            <table>
                <thead>
                <tr>
                    <td></td>
                    <td>author</td>
                    <td>published</td>
                </tr>
                </thead>
                <tbody>
            
        {books && books.map(p =>
            <tr key={p.title}>
                <td>{p.title}</td>
                <td>{p.author.name}</td>
                <td>{p.published}</td>
            </tr>  
        )}
        </tbody>
        </table>
      </div>
    )
    }
    
    export default Books