// new types
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
  export interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  export interface CourseNormalPart extends CoursePartDescription {
    type: "normal";
  }
  export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
  export interface CourseSubmissionPart extends CoursePartDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  export interface CourseRequirementsPart extends CoursePartDescription {
    type: "special"
    requirements: Array<string>
  }

  export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;