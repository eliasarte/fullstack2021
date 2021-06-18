import React from 'react'
import { CoursePart } from '../types'

interface PartProps {
  part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
  
const Part = ( props: PartProps) => {
  switch (props.part.type) {
    case "normal":
      return (
        <><h3>{props.part.name} {props.part.exerciseCount}</h3>
        <p>{props.part.description}</p></>
      )
    case "groupProject":
      return (
        <><h3>{props.part.name} {props.part.exerciseCount}</h3>
        <p>project exercises: {props.part.groupProjectCount}</p></>
      )
    case "submission":
      return (
        <><h3>{props.part.name} {props.part.exerciseCount}</h3>
        <p>{props.part.description}</p>
        <p>submit to {props.part.exerciseSubmissionLink}</p></>
      )
    case "special":
      return (
        <><h3>{props.part.name} {props.part.exerciseCount}</h3>
        <p>{props.part.description}</p>
        <p>requirements: {props.part.requirements.join(", ")}</p></>
      )
    default:
      return assertNever(props.part)
  }
};
  
export default Part