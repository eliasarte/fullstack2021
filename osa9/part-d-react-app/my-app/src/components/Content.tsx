import React from 'react'
import { CoursePart } from '../types'
import Part from './Part'

interface ContentProps {
  part: Array<CoursePart>
}
  
const Content = ( props: ContentProps) => {
  return (
    <>
    {props.part.map(course =>
      <p key={course.name}>
        {<Part part={course} />}
      </p>)}
    </>
  )
};
  
export default Content