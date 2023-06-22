---
to: "src/<%= folder %>/<%= parent ? parent : name %>/<%= name %>.tsx"
unless_exists: false
---
import React from "react";
<%- folder === "components" ?
`import cn from "../../libs/class-name";
import { Component } from "../../types/component";`
: 
`import { Component } from "../../types/component";`
%>


export interface Props extends Component {
  
}

const <%= name %> = ({<%- folder === "components" ? `classNames = []` : null %>}: Props) => (

  <div<%- folder === "components" ? ` className={cn("${name}", [], classNames)}`: null%>>

  </div>
);

export default <%= name %>;