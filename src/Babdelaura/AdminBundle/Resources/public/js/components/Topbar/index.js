import { h, Component } from "preact";
import classnames from "classnames";

class TopbarItem extends Component {
  render({ children, href }) {
    return (
      <a class="Topbar_link" href={href}>
        {children}
      </a>
    );
  }
}

class TopbarGroup extends Component {
  render({ children, pullRight = false }) {
    return (
      <div
        class={classnames({
          Topbar_group: true,
          "Topbar_group-pullRight": pullRight
        })}
      >
        {children}
      </div>
    );
  }
}

class Topbar extends Component {
  render({ children }) {
    return (
      <nav class="Topbar">
        {children}
      </nav>
    );
  }
}

export default Topbar;
export { Topbar, TopbarGroup, TopbarItem };
