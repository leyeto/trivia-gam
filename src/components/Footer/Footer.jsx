import github from "../../assets/icons/github.svg";
import linkedIn from "../../assets/icons/linkedin.svg";
import envelope from "../../assets/icons/envelope.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="footer__text">Feel free to contact me</h4>
      <ul className="footer__links">
        <li className="footer__list-item">
          <a
            className="footer__envelope"
            href="mailto:ioaleye@gmail.com?subject=Contacting you via trivia website"
            target="blank"
          >
            <img
              className="footer__envelope-icon link-img"
              src={envelope}
              alt="envelope icon"
            />
          </a>
        </li>
        <li className="footer__list-item">
          <a
            className="footer__linkedIn-link"
            href="https://www.linkedin.com/in/adeleye-ifaturoti/"
            target="blank"
          >
            <img
              className="footer__linkedIn-icon link-img"
              src={linkedIn}
              alt="linkedIn icon"
            />
          </a>
        </li>
        <li className="footer__list-item">
          <a
            className="footer__github-link"
            href="https://www.github.com/leyeto/"
            target="blank"
          >
            <img
              className="footer__github-icon link-img"
              src={github}
              alt="github icon"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
