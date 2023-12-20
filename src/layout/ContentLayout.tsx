import * as React from "react";
import { Head } from "../components/Head";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      {children}
    </>
  );
};
