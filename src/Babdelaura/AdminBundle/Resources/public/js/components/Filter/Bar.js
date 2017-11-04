import { h, Component } from "preact";

class FilterBar extends Component {
  render({ children }) {
    return (
      <div class="Filter">
        {children}
      </div>
    );
  }
}

export default FilterBar;
