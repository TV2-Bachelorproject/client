import React from "react";
import "./Grid.css";
import cx from "classnames";
import PropTypes from "prop-types";

export const Grid = ({
  className,
  gutter,
  stretch,
  center,
  base,
  medium,
  large,
  xlarge,
  tag,
  ...rest
}) => {
  const Component = tag;
  return (
    <Component
      className={cx(
        "tc_grid",
        className,
        gutter && "tc_grid--gutter",
        stretch && "tc_grid--stretch",
        center && "tc_grid--center"
      )}
      data-grid-bs={base}
      data-grid-md={medium}
      data-grid-lg={large}
      data-grid-xl={xlarge}
      {...rest}
    />
  );
};

Grid.propTypes = {
  className: PropTypes.string,
  gutter: PropTypes.bool,
  stretch: PropTypes.bool,
  center: PropTypes.bool,
  base: PropTypes.string,
  medium: PropTypes.string,
  large: PropTypes.string,
  xlarge: PropTypes.string,
  tag: PropTypes.oneOf([
    "div",
    "section",
    "article",
    "aside",
    "nav",
    "header",
    "footer",
  ]),
};

Grid.defaultProps = {
  className: undefined,
  gutter: false,
  stretch: false,
  center: false,
  tag: "div",
  base: undefined,
  medium: undefined,
  large: undefined,
  xlarge: undefined,
};
