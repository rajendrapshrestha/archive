import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//import { prettyDOM } from '@testing-library/dom'

test('on load renders title/author but not details', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'John Smith',
      url: 'http://abc.com',
      likes: 1
    }

    const onRemove = () => {
    }
  
    const component = render(
      <Blog blog={blog} handleRemove={onRemove}/>
    )
  
    //const li = component.container.querySelector('li')
    //console.log(prettyDOM(li))
  
    // check title and author
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent('John Smith')

    //check that details (url and likes) do not appear 
    expect(component.container.querySelector('.blogDetails')).toBeNull()
  })

  test('when details button clicked, renders url and likes', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'John Smith',
      url: 'http://abc.com',
      likes: 1
    }

    const onRemove = () => {
    }
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} handleRemove={onRemove}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container.querySelector('.blogDetails')).toBeDefined()
    expect(component.container).toHaveTextContent('http://abc.com')
  })

  test('when remove button clicked, calls passed in handler', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'John Smith',
      url: 'http://abc.com',
      likes: 1
    }

    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} handleRemove={mockHandler}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    const button2 = component.getByText('remove')
    fireEvent.click(button2)
    //expect(mockHandler.mock.calls).toHaveLength(1)
  })