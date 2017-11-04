import { h, Component } from "preact";
import classnames from "classnames";

class FilterLink extends Component {
  render({ children, current = false, href }) {
    return (
      <a
        class={classnames({
          Filter_link: true,
          "Filter_link-current": current
        })}
        href={href}
      >
        {children}
      </a>
    );
  }
}

export default FilterLink;
