import React, { useState, useEffect } from "react";
import Form from "../../components/Form";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

import "./styles/edit.css";

export default function Edit(props) {
  let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/pacoe/image/upload";
  let CLOUDINARY_PRESET = "zcoelvxn";
  let coverFile = null;

  const [form, setForm] = useState({
    form: {
      name: "",
      authors: "",
      narrators: "",
      duration: "",
      cover: "",
    },
  });

  const [cover, setCover] = useState("");
  const [coverReady, setCoverReady] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingAudioBook, setIsLoadingAudioBook] = useState(false);
  const [audioBookVersion, setAudioBookVersion] = useState(0);

  /**************
   * Handlers methods
   ***************/

  let handleSubmit = (e) => {
    e.preventDefault();
    uploadAudiobook();
  };

  let handleChange = (e) => {
    setForm({
      form: {
        ...form.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  let handleFileChange = (e) => {
    setCoverReady(false);
    coverFile = e.target.files[0];
    uploadImage();
  };

  /**********
   * Upload's methods
   ***********/

  const uploadImage = async () => {
    setIsLoadingImage(true);

    let formData = new FormData();

    formData.append("file", coverFile);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setCover(data.url);
    setCoverReady(true);
    setIsLoadingImage(false);
  };

  const uploadAudiobook = () => {
    setIsLoadingAudioBook(true);

    let newAudiobook = {
      fields: {
        title: {
          "es-MX": form.form.name,
        },
        is_original: {
          "es-MX": false,
        },
        street_date: {
          "es-MX": new Date().toISOString(),
        },
        cost_per_play: {
          "es-MX": 90,
        },
        authors: {
          "es-MX": form.form.authors.split(",").map((a) => a.trim()),
        },
        narrators: {
          "es-MX": form.form.narrators.split(",").map((a) => a.trim()),
        },
        duration: {
          "es-MX": parseInt(form.form.duration, 10),
        },
        cover: {
          "es-MX": cover,
        },
      },
    };

    if (coverReady) {
      fetchNewAudioBook(newAudiobook);
    }
  };

  /***********
   * Fetch's methods
   ***********/

  const fetchNewAudioBook = async (audioBook) => {
    console.log(audioBook);
    await fetch(
      `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries/${props.match.params.idAudioBook}`,
      {
        method: "PUT",
        body: JSON.stringify(audioBook),
        headers: {
          Authorization:
            "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
          "Content-Type": "application/json",
          "X-Contentful-Content-Type": "audiocontent-v11",
          "X-Contentful-Version": audioBookVersion,
        },
      }
    );

    setIsLoadingAudioBook(false);
    props.history.goBack();
  };

  const fetchAudioBook = async () => {
    const response = await fetch(
      `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?&sys.id=${props.match.params.idAudioBook}&select=fields,sys.id,sys.version&locale=es-MX`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
        },
      }
    );
    const data = await response.json();
    setAudioBookVersion(data.items[0].sys.version);

    setForm({
      form: {
        name: data.items[0].fields.title["es-MX"],
        authors: data.items[0].fields.authors["es-MX"].join(),
        narrators: data.items[0].fields.narrators["es-MX"].join(),
        duration: data.items[0].fields.duration["es-MX"],
        cover: data.items[0].fields.cover["es-MX"],
      },
    });
    setCover(data.items[0].fields.cover["es-MX"]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAudioBook();
  }, []);

  return (
    <Layout history={props.history} title="Edit Audiobook">
      <section className="new--form">
        <Form
          name={form.form.name}
          authors={form.form.authors}
          narrators={form.form.narrators}
          duration={form.form.duration}
          onHandleChange={handleChange}
          onFileChange={handleFileChange}
          onHandleSubmit={handleSubmit}
        />
      </section>
      {<Loader isLoading={isLoading}>Loading...</Loader>}
      {<Loader isLoading={isLoadingImage}>Uploading image...</Loader>}
      {<Loader isLoading={isLoadingAudioBook}>Updating audiobook...</Loader>}
    </Layout>
  );
}
