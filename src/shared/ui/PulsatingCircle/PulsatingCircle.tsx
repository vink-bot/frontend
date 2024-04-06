/**
 * Круг, который пульсирует с помощью анимации при наведении курсора анимация прекращается.
 *
 * @constructor
 */
const PulsatingCircle = () => {
  return <span className="absolute animate-ping hover:animate-none rounded-full bg-yellow inline-flex h-full w-full opacity-60 hover:opacity-0 duration-3000"></span>;
};

export default PulsatingCircle;
