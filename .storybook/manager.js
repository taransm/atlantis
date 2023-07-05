import { addons } from "@storybook/addons";
import { SidebarLabel } from "./components/SidebarLabel";
import theme from "./theme";
import favicon from "./assets/favicon.svg";
import "./assets/css/manager.css";
import "@jobber/design/foundation.css";

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);

addons.setConfig({
  theme,
  sidebar: {
    collapsedRoots: [
      "components",
      "design",
      "content",
      "guides",
      "hooks",
      "packages",
      "changelog",
    ],
    renderLabel: SidebarLabel,
  },
});
