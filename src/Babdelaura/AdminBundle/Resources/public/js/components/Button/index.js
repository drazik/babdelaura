import { h, Component } from "preact";
import classnames from "classnames";

const renderAnchor = ({ children, className, href, target, style }) =>
  <a className={className} href={href} target={target} style={style}>
    {children}
  </a>;

const renderComponent = (Component, props) => <Component {...props} />;

/**
 * If a `href` prop is provided, render to a `<a>`
 * Else, render to the provided `component` prop (`button` by default)
 */
const Button = ({
  children,
  className,
  component = "button",
  disabled = false,
  href,
  target = "_self",
  type = "button",
  primary = false
}) => {
  const classNames = classnames(
    {
      Button: true,
      "Button-disabled": disabled,
      "Button-primary": primary
    },
    className
  );

  if (href) {
    return renderAnchor({
      children,
      className: classNames,
      href,
      target
    });
  }

  return renderComponent(component, {
    children,
    className: classNames,
    disabled,
    type
  });
};

export default Button;
