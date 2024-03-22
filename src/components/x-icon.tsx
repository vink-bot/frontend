const XIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      className={className}
    >
      <defs></defs>
      <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <rect
          x="-10.67"
          y="37.03"
          rx="0"
          ry="0"
          width="111.33"
          height="15.95"
          transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -18.6396 44.9973) "
        />
        <rect
          x="37.03"
          y="-10.67"
          rx="0"
          ry="0"
          width="15.95"
          height="111.33"
          transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -18.6396 44.9996) "
        />
      </g>
    </svg>
  );
};

export default XIcon;
