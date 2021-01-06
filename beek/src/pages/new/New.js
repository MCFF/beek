import React, { useState } from "react";
import Form from "../../components/Form";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

import "./styles/new.css";

export default function New(props) {
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
  const [coverReady, setCoverReady] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingAudioBook, setIsLoadingAudioBook] = useState(false);

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
    await fetch(
      "https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
          "Content-Type": "application/json",
          "X-Contentful-Content-Type": "audiocontent-v11",
        },
        body: JSON.stringify(audioBook),
      }
    );
    setIsLoadingAudioBook(false);
    props.history.goBack();
  };

  return (
    <Layout history={props.history} title="New Audiobook">
      <section className="new--form">
        <Form
          name={form.form.name}
          authors={form.form.authors}
          narrators={form.form.narrators}
          duration={form.form.duration}
          onHandleChange={handleChange}
          onFileChange={handleFileChange}
          onHandleSubmit={handleSubmit}
          new
        />
      </section>
      {<Loader isLoading={isLoadingImage}>Uploading image...</Loader>}
      {<Loader isLoading={isLoadingAudioBook}>Uploading audiobook...</Loader>}
    </Layout>
  );
}
