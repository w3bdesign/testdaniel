import { IconContext } from "react-icons";
import { BiCopyright } from "react-icons/bi";

/**
 * Renders the footer for the application
 * @function Footer
 * @returns {JSX.Element} - Rendered Hamburger component
 */

const Footer = () => (
  <footer aria-label="Innholdet for bunnteksten med copyright" data-testid="footer" className="fixed bottom-0 w-full">
    <div className="bg-gray-800 shadow w-full">
      <div className="w-full mx-auto p-6 text-center text-white font-semibold inline-block">
        Copyright killaH
        <IconContext.Provider value={{ className: "inline-block m-2" }}>
          <BiCopyright size="1.2em" />
        </IconContext.Provider>
        {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
