import { h, Component } from "preact";
import { Topbar, TopbarGroup, TopbarItem } from "../Topbar";
import { IconEye, IconBubble, IconLogout } from "../Icon";
import {
  Navigation,
  NavigationGroup,
  NavigationItem,
  NavigationLink
} from "../Navigation";
import Sidebar from "../Sidebar";

class App extends Component {
  render() {
    return (
      <div>
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

        <Sidebar>
          <Navigation>
            <NavigationGroup>
              <NavigationItem>
                <NavigationLink href="#">Accueil</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="#">Statistiques</NavigationLink>
              </NavigationItem>
            </NavigationGroup>
            <NavigationGroup>
              <NavigationItem isCurrent hasSubNav>
                <NavigationLink href="#">Articles</NavigationLink>
                <NavigationGroup>
                  <NavigationItem>
                    <NavigationLink href="#">Tous les articles</NavigationLink>
                  </NavigationItem>
                  <NavigationItem>
                    <NavigationLink href="#">Ajouter un article</NavigationLink>
                  </NavigationItem>
                  <NavigationItem>
                    <NavigationLink href="#">Catégories</NavigationLink>
                  </NavigationItem>
                  <NavigationItem>
                    <NavigationLink href="#">Tags</NavigationLink>
                  </NavigationItem>
                </NavigationGroup>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="#">Pages</NavigationLink>
                <NavigationGroup>
                  <NavigationItem>
                    <NavigationLink href="#">Toutes les pages</NavigationLink>
                  </NavigationItem>
                  <NavigationItem>
                    <NavigationLink href="#">
                      Ajouter une page interne
                    </NavigationLink>
                  </NavigationItem>
                  <NavigationItem>
                    <NavigationLink href="#">
                      Ajouter une page externe
                    </NavigationLink>
                  </NavigationItem>
                </NavigationGroup>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="#">Commentaires</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="#">Gallerie</NavigationLink>
              </NavigationItem>
            </NavigationGroup>
          </Navigation>
        </Sidebar>
      </div>
    );
  }
}

export default App;
