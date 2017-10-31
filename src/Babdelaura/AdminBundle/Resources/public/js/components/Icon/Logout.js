import { h, Component } from "preact";

class IconLogout extends Component {
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
        <title>logout</title>
        <path
          d="M20 4.581v4.249c1.131 0.494 2.172 1.2 3.071 2.099 1.889 1.889 2.929 4.4 2.929 7.071s-1.040 5.182-2.929 7.071c-1.889 1.889-4.4 2.929-7.071 2.929s-5.182-1.040-7.071-2.929c-1.889-1.889-2.929-4.4-2.929-7.071s1.040-5.182 2.929-7.071c0.899-0.899 1.94-1.606 3.071-2.099v-4.249c-5.783 1.721-10 7.077-10 13.419 0 7.732 6.268 14 14 14s14-6.268 14-14c0-6.342-4.217-11.698-10-13.419zM14 0h4v16h-4z"
          fill={fillColor}
        />
      </svg>
    );
  }
}

export default IconLogout;
