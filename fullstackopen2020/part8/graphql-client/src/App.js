import React, { useState, useEffect } from 'react'
import {
  useQuery, useSubscription, useApolloClient
} from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import { ALL_PERSONS, PERSON_ADDED } from './components/queries'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './components/queries-books'

const App = () => {
  const showPhones = false
  const [errorMessage, setErrorMessage] = useState(null)
  const [showAuthors, setShowAuthors] = useState(true)
  const [showBooks, setShowBooks] = useState(false)
  const [showBookForm, setShowBookForm] = useState(false)
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  //const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('phonenumbers-user-token'))
  }, []) 

  /*
  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_PERSONS })
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons : dataInStore.allPersons.concat(addedPerson) }
      })
    }   
  }
  */

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCacheWith(addedPerson)
    }
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const showAuthorsList = () => {
    setShowAuthors(true)
    setShowBooks(false)
    setShowBookForm(false)
  }
  const showBooksList = () => {
    setShowAuthors(false)
    setShowBooks(true)
    setShowBookForm(false)
  }
  const showAddBookForm = () => {
    setShowAuthors(false)
    setShowBooks(false)
    setShowBookForm(true)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  if (result.loading)  {
    return <div>loading...</div>
  }


  
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>Logout</button>

      {showPhones && 
          <ShowPhones data={result.data.allPersons} notify={notify} updateCacheWith={updateCacheWith} />
      }
      {!showPhones && 
        <div>
          <button onClick={() => showAuthorsList()}>authors</button>
          <button onClick={() => showBooksList()}>books</button>
          <button onClick={() => showAddBookForm()}>add book</button>
          <ShowBooksAuthors showAuthors={showAuthors} showBooks={showBooks} 
            showBookForm={showBookForm} notify={notify} updateCacheWith={updateCacheWith}/>
        </div>
      }
    </div>
  )
}

const ShowPhones = ({data, notify, updateCacheWith}) => {
  return (
    <div>
      <Persons persons = {data}/>
      <PersonForm setError={notify} updateCacheWith={updateCacheWith} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const ShowBooksAuthors = ({showAuthors, showBooks, showBookForm, notify, updateCacheWith}) => {
  return (
    <div>
      {showAuthors && 
        <Authors setError={notify} />
      }
      {showBooks && 
        <Books />
      }
      {showBookForm && 
        <BookForm setError={notify} updateCacheWith={updateCacheWith}/>
      }
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App
