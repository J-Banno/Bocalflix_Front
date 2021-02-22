import "./FilmSelect.css";
import Row from "react-bootstrap/Row";
import FilmCard from "./Card.js";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

function FilmSelect() {
  /* Variable d'état */
  const [movies, setMovie] = useState([]);
  const [modalData, setModalData] = useState({});
  const [favorites, setFavorites] = useState([]);

  /* Lors du premier affichage du composant App */
  useEffect(getMovie, []);
  useEffect(getFavorites, []);

  let [showModal, setShowModal] = useState(false);
  /**
   * Récupération des films
   */
  async function getMovie() {
    const options = {
      method: "GET",
    };

    const response = await fetch("http://localhost:8000/movies", options);

    const movieData = await response.json();

    setMovie(movieData);
    console.log(movieData);
  }

  /**
   * Récupération des films favoris
   */
  async function getFavorites() {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: "bearer " + token,
      },
    };

    const response = await fetch("http://localhost:8000/favorite", options);

    const favoriteData = await response.json();

    setFavorites(favoriteData);
    console.log(favoriteData);
  }

  //Event Ajouter un content//

  async function addContent(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const options = {
      method: "POST",
      body: JSON.stringify({ movieId: modalData._id }),
      headers: {
        "content-type": "application/json",
        Authorization: "bearer " + token,
      },
    };

    const response = await fetch("http://localhost:8000/favorite", options);
    const favoriteData = await response.json();

    console.log(favoriteData);
  }

  // Catégories
  function renderFavorites() {
    console.log(favorites);
    return favorites.map(function (movie) {
      return <FilmCard openModal={openModal} data={movie} />;
    });
  }

  function renderMovies() {
    return movies
      .filter((movie) => movie.category.includes("Action"))
      .map(function (movie) {
        return <FilmCard openModal={openModal} data={movie} />;
      });
  }
  function renderMarvelCards() {
    return movies
      .filter((movie) => movie.category.includes("Marvel"))
      .map(function (movie) {
        return <FilmCard openModal={openModal} data={movie} />;
      });
  }

  function renderSerieCards() {
    return movies
      .filter((movie) => movie.category.includes("Series"))
      .map(function (movie) {
        return <FilmCard openModal={openModal} data={movie} />;
      });
  }

  function renderHorrorCards() {
    return movies
      .filter((movie) => movie.category.includes("Horror"))
      .map(function (movie) {
        return <FilmCard openModal={openModal} data={movie} />;
      });
  }

  // Afficher Modal

  function openModal(data) {
    setShowModal(true);
    setModalData(data);
  }

  return (
    <div className="Content">
      <h2 className="Categorie">Liste de favoris</h2>
      <Row id="BoxCards">{renderFavorites()}</Row>

      <h2 className="Categorie">Notre selection de film</h2>
      <Row id="BoxCards">{renderMovies()}</Row>

      <h2 className="Categorie">Nos series</h2>
      <Row id="BoxCards">{renderSerieCards()}</Row>

      <h2 className="Categorie">Notre categorie Horreur</h2>
      <Row id="BoxCards">{renderHorrorCards()}</Row>

      <h2 className="Categorie">Notre selection pour Marvel</h2>
      <Row id="BoxCards">{renderMarvelCards()}</Row>

      <Modal
        id="showMod"
        onHide={function () {
          setShowModal(false);
        }}
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="closeModal" closeButton>
          <Modal.Title id="topModal">
            <iframe
              width="350"
              height="250"
              src={modalData.video}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalData.description}</p>
        </Modal.Body>
        <Modal.Footer id="svgModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-play-circle"
            className="svgPlay"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
            className="svgAdd"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-heart"
            viewBox="0 0 16 16"
            className="svgLove"
            onClick={addContent}
          >
            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FilmSelect;
