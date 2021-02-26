const Button = ({ name }) => {
  const handleClick = () => {
    alert(`You clicked on button ${name}`)
  }
  return <button onClick={handleClick}>{name}</button>;
};


export default Button;
