import React, { useEffect, useState } from "react";
import useElapsedTime from "../../customHooks/useElapsedTime";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

import audioUrl from "../../audiotest/fresco_gerardina.m4a";

import "./styles/details.css";
import AddNote from "../../components/AddNote";

import options from "../../images/options.png";
import Options from "../../components/Options";
import DeleteAudiobook from "../../components/DeleteAudiobook";
import Playback from "../../components/Playback";
import Notes from "../../components/Notes";

export default function Details(props) {
  let audio = new Audio(audioUrl);

  const [isLoading, setIsLoading] = useState(true);
  const [showingBook, setShowingbook] = useState({
    fields: {
      title: {
        "es-MX": "",
      },
      cover: {
        "es-MX": "",
      },
    },
    sys: {
      id: "",
    },
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [elapsedTimeString, setElapsedTimeString] = useState("");
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState([]);
  const [showingNotes, setShowingNotes] = useState(false);
  const [showingAddNote, setShowingAddNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [showingOptions, setShowingOptions] = useState(false);
  const [showingDelete, setShowingDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const fetchAudioBook = async () => {
    const response = await fetch(
      `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?sys.id=${props.match.params.idAudioBook}&select=fields,sys.id,sys.version&locale=es-MX`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
        },
      }
    );
    const data = await response.json();

    setShowingbook(data.items[0]);
    console.log(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAudioBook();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setDuration(audio.duration);
    }
  }, [isLoading]);

  const useShowAddNote = () => {
    audio.pause();
    setShowingAddNote(true);
  };

  const useCloseAddNote = () => {
    audio.play();
    setShowingAddNote(false);
  };

  const onNoteChange = (note) => {
    setNoteText(note.target.value);
  };

  const useAddNote = () => {
    setNotes([
      ...notes,
      {
        time: elapsedTime,
        note: noteText,
      },
    ]);
    setNoteText("");
    useCloseAddNote();
    audio.play();
    setIsPlaying(true);
  };

  const useShowNotes = () => {
    setShowingNotes(true);
  };
  const useCloseNotes = () => {
    setShowingNotes(false);
  };

  const usePlay = () => {
    setIsPlaying(true);
    audio.play();
  };
  const usePause = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const useUpdateTime = () => {
    setElapsedTime(audio.currentTime);
    setElapsedTimeString(useElapsedTime(elapsedTime));
  };

  const useSeek = (e) => {
    setElapsedTime(e.target.value);
    audio.currentTime = e.target.value;
  };

  const useShowOptions = (e) => {
    setShowingOptions(true);
  };

  const useCloseOptions = (e) => {
    setShowingOptions(false);
  };

  const useDeleteAudiobookMessage = (e) => {
    setShowingOptions(false);
    setShowingDelete(true);
  };

  const useCloseDeleteAudiobook = (e) => {
    setShowingDelete(false);
  };

  const useConfirmDeleteAudiobook = (e) => {
    setIsLoadingDelete(true);
    fetchDeleteAudiobook();
    setShowingDelete(false);
  };

  const fetchDeleteAudiobook = async () => {
    await fetch(
      `https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries/${props.match.params.idAudioBook}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc",
        },
      }
    );
    props.history.goBack();
  };

  return (
    <Layout history={props.history} title="Details">
      <section className="details">
        <picture className="details--cover">
          <img src={showingBook.fields.cover["es-MX"]} alt="Audiobook cover" />
        </picture>
        <p className="details--title">{showingBook.fields.title["es-MX"]}</p>
        <div className="details--controllers">
          <audio
            src={audioUrl}
            ref={(ref) => (audio = ref)}
            onTimeUpdate={useUpdateTime}
          ></audio>
          <Playback
            isPlaying={isPlaying}
            usePlay={usePlay}
            usePause={usePause}
          />
          <picture
            className="details--controllers--options"
            onClick={useShowOptions}
          >
            <img src={options} alt="options" />
          </picture>
        </div>

        <div className="details--timeline">
          <p>
            <input
              type="range"
              min="0"
              max={duration}
              value={elapsedTime}
              onChange={useSeek}
            />
          </p>
          <p>{elapsedTimeString}</p>
        </div>
        <div className="details--notes--controls">
          <button onClick={useShowAddNote}>Add note</button>
          <button onClick={useShowNotes}>Show notes</button>
        </div>
      </section>
      <Notes
        showingNotes={showingNotes}
        useCloseNotes={useCloseNotes}
        notes={notes}
      />

      <AddNote
        showing={showingAddNote}
        addNote={useAddNote}
        closeAddNote={useCloseAddNote}
        onNoteChange={onNoteChange}
        noteValue={noteText}
      />

      <Options
        showing={showingOptions}
        closeOptions={useCloseOptions}
        onDelete={useDeleteAudiobookMessage}
        idAudiobook={showingBook.sys.id}
      />

      <DeleteAudiobook
        showing={showingDelete}
        title={showingBook.fields.title["es-MX"]}
        cancelDelete={useCloseDeleteAudiobook}
        confirmDelete={useConfirmDeleteAudiobook}
      />
      <Loader isLoading={isLoading}>Loading audiobook...</Loader>
      <Loader isLoading={isLoadingDelete}>Deleting...</Loader>
    </Layout>
  );
}
