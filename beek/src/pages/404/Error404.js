import React from "react";
import Layout from "../../components/Layout";
import "./styles/error.css";

export default function Error404() {
  return (
    <Layout title="Error">
      <section className="error">
        <h1>404</h1>
        <p>📵Page not found</p>
      </section>
    </Layout>
  );
}
