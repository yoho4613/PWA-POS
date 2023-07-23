// pages/_error.tsx
import React from "react";
import { NextPageContext } from "next";

type ErrorPageProps = {
  statusCode?: number;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
  return (
    <div className="flex justify-center items-center">
      <h1 className="font-bold text-xl">Error {statusCode}</h1>
      {/* Display relevant information based on the error status code */}
    </div>
  );
};

export async function getServerSideProps({ res, err }: NextPageContext) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { props: { statusCode } };
}

export default ErrorPage;
