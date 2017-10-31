import { h, Component } from "preact";

class IconHome extends Component {
  render({ width = 32, height = 32, fillColor = "currentColor", className }) {
    return (
      <svg
        class={className}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 32 32"
        aria-labelledby="title"
      >
        <title>Home</title>
        <path
          d="M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z"
          fill={fillColor}
        />
      </svg>
    );
  }
}

export default IconHome;
