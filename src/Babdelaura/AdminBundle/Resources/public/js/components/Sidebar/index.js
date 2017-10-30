import { h, Component } from "preact";

class Sidebar extends Component {
  render({ children }) {
    return (
      <aside class="Sidebar">
        {children}
      </aside>
    );
  }
}

export default Sidebar;
