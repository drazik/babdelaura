import { h, Component } from "preact";
import classnames from "classnames";

class NavigationLink extends Component {
  render({ children, href }) {
    return (
      <a class="Navigation_link" href={href}>
        {children}
      </a>
    );
  }
}

class NavigationItem extends Component {
  render({ children, isCurrent = false }) {
    const links = children.filter(
      child => child.nodeName.name === "NavigationLink"
    );
    const groups = children.filter(
      child => child.nodeName.name === "NavigationGroup"
    );

    return (
      <div
        class={classnames({
          Navigation_item: true,
          "Navigation_item-current": isCurrent,
          "Navigation_item-hasSubNav": groups.length > 0
        })}
      >
        {links}
        {groups}
      </div>
    );
  }
}

class NavigationGroup extends Component {
  render({ children }) {
    return (
      <div class="Navigation_group">
        {children}
      </div>
    );
  }
}

class Navigation extends Component {
  render({ children }) {
    return (
      <nav class="Navigation">
        {children}
      </nav>
    );
  }
}

export default Navigation;
export { Navigation, NavigationGroup, NavigationItem, NavigationLink };
