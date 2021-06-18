import React from 'react'
import { CoursePart } from '../types'

interface TotalProps {
  part: Array<CoursePart>
}
  
const Footer = (props: TotalProps) => {
  return (
    <><br/>
    <b>
    Number of exercises{" "}
    {props.part.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </b></>)
};
  
export default Footer