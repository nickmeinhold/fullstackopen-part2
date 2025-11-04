const Total = ({ course }) => {
  return (
    <strong>
      Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
      exercises
    </strong>
  );
};

export default Total;
