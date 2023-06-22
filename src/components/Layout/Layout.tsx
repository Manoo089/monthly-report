import Head from "next/head";
import React from "react";

import cn from "../../libs/class-name";
import { Component } from "../../types/component";

export interface Props extends Component {
  children: React.ReactNode;
}

const Layout = ({ children, classNames = [] }: Props) => (
  <div className={cn("Layout", [], classNames)}>
    <Head>
      <title>Berichte</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {children}
  </div>
);

export default Layout;
