import { h, Component } from "preact";

class Box extends Component {
  render({ children }) {
    return (
      <div class="Box">
        {children}
      </div>
    );
  }
}

export default Box;
