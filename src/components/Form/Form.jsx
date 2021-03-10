import Button from "../Button/Button";
import Input from "./Input";

const Form = () => {
  return (
    <form>
      <Input label="login" placeholder="Enter your name" />
      <Input label="password" placeholder="Enter your password" />
      <Button name="Submit" />
    </form>
  );
};

export default Form;
