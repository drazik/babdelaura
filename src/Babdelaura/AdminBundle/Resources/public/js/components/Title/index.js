import { h, Component } from "preact";
import classnames from "classnames";

class Title extends Component {
  render({ children, small = false }) {
    return (
      <h1
        class={classnames({
          Title: true,
          "Title-small": small
        })}
      >
        {children}
      </h1>
    );
  }
}

export default Title;
