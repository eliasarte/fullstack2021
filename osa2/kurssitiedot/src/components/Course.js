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

export default Course