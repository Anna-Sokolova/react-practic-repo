import Button from "./Button"
import Form from "./Form"

const HomePage = ({title, greating}) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{greating}</p>
      <Form />
    </>
  );
};

 export default HomePage;