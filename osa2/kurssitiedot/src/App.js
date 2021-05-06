import React from 'react'

const Header = ( {name }) => {
  return (
    <h2>
      {name}
    </h2>
  )
}

const Part = ({course}) => {
  return(
    <p>
      {course.name} {course.exercises}
    </p>
  )
}

const Total = ({courses}) => {
  const total = courses.reduce( (s, p) => s + p.exercises, 0)
  return (
    <b>total of {total} exercises</b>
  ) 
}

const Content = ({courses}) => {
  return (
    <div>
      {courses.map(course => 
        <Part key={course.id} course={course} />
      )}
      <Total courses={courses} />
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content courses={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(part => 
        <Course key={part.id} course={part} />
      )}
    </div>
  )
}

export default App