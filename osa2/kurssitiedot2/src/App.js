import React from "react";
import Course from "./components/course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    },
    {name: "TestiKurssi",
    parts: [
      {
        name: "osa1",
        exercises: 2,
        id: 1
      }
    ]}
  ];

  const coursesMOD = () => {
    return courses.map(c => (
      <>
        <Course course={c} />
      </>
    ));
  };

  return (
    <div>
      <h1>Web development curriculum</h1>
      {coursesMOD()}
    </div>
  );
};

export default App;
