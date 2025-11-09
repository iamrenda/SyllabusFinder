function Button({ children, isDisabled, handleClick }) {
  return (
    <button
      className="transition-all duration-300 inline-block bg-blue-600 px-2 py-3 rounded-2xl text-white hover:bg-transparent hover:outline-2 outline-blue-600 hover:text-blue-600 hover:cursor-pointer
      "
      disabled={isDisabled}
      onClick={handleClick}
    >
      <p className="text-sm">{children}</p>
    </button>
  );
}

export default Button;
