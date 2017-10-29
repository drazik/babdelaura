import { h, Component } from "preact";
import { Topbar, TopbarGroup, TopbarItem } from "../Topbar";
import { IconEye, IconBubble, IconLogout } from "../Icon";

class App extends Component {
  render() {
    return (
      <Topbar>
        <TopbarGroup>
          <TopbarItem href="#">
            <IconEye
              className="Topbar_icon"
              width={12}
              height={12}
              fillColor="currentColor"
            />
            Se rendre sur le blog
          </TopbarItem>
          <TopbarItem href="#">
            <IconBubble
              className="Topbar_icon"
              width={12}
              height={12}
              fillColor="currentColor"
            />
            44
          </TopbarItem>
        </TopbarGroup>
        <TopbarGroup pullRight>
          <TopbarItem href="#">
            <IconLogout
              className="Topbar_icon"
              width={12}
              height={12}
              fillColor="currentColor"
            />
            Se déconnecter
          </TopbarItem>
        </TopbarGroup>
      </Topbar>
    );
  }
}

export default App;
