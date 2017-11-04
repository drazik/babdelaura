import { h, Component } from "preact";

class GridCell extends Component {
  render({ children, size }) {
    return (
      <div
        class="Grid_cell"
        style={{
          flexBasis: size ? `${size * 100}%` : null
        }}
      >
        {children}
      </div>
    );
  }
}

export default GridCell;
