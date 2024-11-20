export function Label({ children, htmlFor }) {
  return (
    <label
      className="block text-2xl font-serif font-medium text-green-700 text-center"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export default Label;
