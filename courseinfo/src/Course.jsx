import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content course={course}></Content>

      {/* <strong>
        Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </strong> */}
    </div>
  );
};
export default Course;
