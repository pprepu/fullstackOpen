import React from "react";

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Header = props => {
  return <h2>{props.courseName}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  let total = parts.reduce((acc, p) => {
    return acc + p.exercises;
  }, 0);
  return (
    <p>
      <strong>Number of exercises {total} </strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content id={course.id} parts={course.parts} />
      <Total id={course.id} parts={course.parts} />
    </>
  );
};

export default Course;