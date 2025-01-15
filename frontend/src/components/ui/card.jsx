
import PropTypes from "prop-types";

export function Card({ children }) {
  return (
    <div className="bg-zinc-900 p-10 rounded-md">
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired, // Validación de 'children'
};

export default Card;

