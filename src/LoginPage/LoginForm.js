import "./LoginForm.css";
import { Link } from "react-router-dom";

function FormLog() {
  return (
    <div className="content">
      <div id="FlixLogo">
        <img src="Images\bocalLogo.png" alt="" />
      </div>
      <div className="content-box">
        <form action="">
          <h2 className="TitleForm">S'identifier</h2>

          <input
            type="text"
            className="inp"
            name="mail"
            id=""
            placeholder="Entrez votre email"
          />
          <input
            type="text"
            name="Mot de passe"
            placeholder="Entrez votre mot de passe"
          />
          <Link id="Conect" to="/home">
            Connexion
          </Link>
          <span className="box">
            <input className="LogInp" type="checkbox" id="save" />
            <label htmlFor="save">Se souvenir de moi</label>
          </span>

          <p className="Visite">
            Première visite sur Bocalflix?{" "}
            <Link to="/inscription">S'inscrire</Link>
          </p>
          <div id="Social">
            <img src="Images/Social/facebook.png" alt="" />
            <p>
              <a href="#">Se connecter via Facebook</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLog;
