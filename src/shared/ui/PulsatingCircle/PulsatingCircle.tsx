/**
 * Круг, который пульсирует с помощью анимации при наведении курсора анимация прекращается.
 *
 * @constructor
 */
const PulsatingCircle = () => {
  return <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 bg-yellow duration-3000 hover:animate-none hover:opacity-0"></span>;
};

export default PulsatingCircle;
