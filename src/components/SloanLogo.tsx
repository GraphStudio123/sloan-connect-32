import { Link } from "react-router-dom";

const LOGO_URL =
  "https://mitsloan.mit.edu/sites/default/files/styles/og_image/public/2020-09/logo_thumb_4.png.webp?h=6822f027&itok=_Dj2poFZ";

interface SloanLogoProps {
  className?: string;
}

const SloanLogo = ({ className = "h-8" }: SloanLogoProps) => (
  <Link to="/" className="flex shrink-0 items-center" aria-label="Sloan Connect home">
    <img
      src={LOGO_URL}
      alt="MIT Sloan"
      className={className}
    />
  </Link>
);

export default SloanLogo;
