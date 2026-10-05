import React from 'react'

const Header = ({name}) => {
    return (
        <h2>
          {name}
        </h2>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
      {parts.map((part) => 
         <p key={part.id}>
            {part.name} {part.exercises}
        </p>
        )}
      </>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce( (s, p) => s + p.exercises, 0 )
    return (
        <p>
          total of {total} exercises
        </p>
    )
  }

  const Course = ({course}) => {
      return (
          <>
        <Header name={course.name} />
        <Content parts={course.parts} /> 
        <Total parts={course.parts} /> 
        </>
      )
  }

export default Course