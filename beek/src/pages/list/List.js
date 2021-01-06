import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AudioBooksList from "../../components/AudioBooksList";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

import "./styles/list.css";

export default function List(props) {
  let books = [];
  const [query, setQuery] = useState("");
  const [showingBooks, setShowingbooks] = useState(books);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    searchBooks();
  }, [query]);

  const fetchBooks = async () => {
    const response = await fetch(
      "https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=audiocontent-v11",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
        },
      }
    );
    const data = await response.json();
    setShowingbooks(data.items);
    setIsLoading(false);
  };

  const searchBooks = async () => {
    const response = await fetch(
      `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?query=${query}&select=fields,sys.id&locale=es-MX&content_type=audiocontent-v11`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
        },
      }
    );
    const data = await response.json();
    setShowingbooks(data.items);
  };

  return (
    <Layout onChange={handleSearch} queryValue={query} search={true}>
      <nav className="list--nav">
        <Link to="/new" className="list--link__green">
          New audiobook
        </Link>
      </nav>
      <section className="list">
        <ul>
          <AudioBooksList showingBooks={showingBooks} />
        </ul>
      </section>
      <Loader isLoading={isLoading}>Loading...</Loader>
    </Layout>
  );
}
