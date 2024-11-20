export function Button({ children }) {
  return (
    <button className="bg-green-700 hover:bg-green-800 text-white font-semibold font-serif py-2 px-4 mt-2 w-full rounded">
      {children}
    </button>
  );
}

export default Button;
