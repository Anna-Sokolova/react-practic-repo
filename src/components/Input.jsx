const Input = ({ label, placeholder }) => {
  return (
    <div>
      <span>{label}</span>
      <br />
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default Input;
