import { h, Component } from "preact";

class Content extends Component {
  render({ children }) {
    return (
      <main class="Content">
        {children}
      </main>
    );
  }
}

export default Content;
