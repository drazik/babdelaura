import { h, Component } from "preact";
import { Topbar, TopbarGroup, TopbarItem } from "../Topbar";
import {
  IconEye,
  IconBubble,
  IconLogout,
  IconHome,
  IconGraph,
  IconPencil,
  IconSheet,
  IconCamera
} from "../Icon";
import {
  Navigation,
  NavigationGroup,
  NavigationItem,
  NavigationLink
} from "../Navigation";
import Sidebar from "../Sidebar";
import Content from "../Content";
import Title from "../Title";
import Box from "../Box";

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
                <NavigationLink href="#">
                  <IconHome
                    width={14}
                    height={14}
                    className="Navigation_icon"
                  />
                  Accueil
                </NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="#">
                  <IconGraph
                    width={14}
                    height={14}
                    className="Navigation_icon"
                  />
                  Statistiques
                </NavigationLink>
              </NavigationItem>
            </NavigationGroup>
            <NavigationGroup>
              <NavigationItem isCurrent hasSubNav>
                <NavigationLink href="#">
                  <IconPencil
                    width={14}
                    height={14}
                    className="Navigation_icon"
                  />
                  Articles
                </NavigationLink>
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
                <NavigationLink href="#">
                  <IconSheet
                    width={14}
                    height={14}
                    className="Navigation_icon"
                  />
                  Pages
                </NavigationLink>
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
                <NavigationLink href="#">
                  <IconBubble
                    width={14}
                    height={14}
                    className="Navigation_icon"
                  />
                  Commentaires
                </NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink href="#">
                  <IconCamera
                    width={14}
                    height={14}
                    className="Navigation_icon"
                  />
                  Gallerie
                </NavigationLink>
              </NavigationItem>
            </NavigationGroup>
          </Navigation>
        </Sidebar>

        <Content>
          <Title>Accueil</Title>
          <Title small>Accueil</Title>

          <Box>
            <p>Lorem ipsum dolor sit amet</p>
          </Box>
        </Content>
      </div>
    );
  }
}

export default App;
