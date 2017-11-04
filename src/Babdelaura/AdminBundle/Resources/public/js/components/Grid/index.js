import { h, Component } from "preact";
import GridCell from "./Cell";
import classnames from "classnames";

class Grid extends Component {
  render({ children, hasGutters = false }) {
    return (
      <div
        class={classnames({
          Grid: true,
          "Grid-gutters": hasGutters
        })}
      >
        {children}
      </div>
    );
  }
}

export default Grid;
export { Grid, GridCell };
