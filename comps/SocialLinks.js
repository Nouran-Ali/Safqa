import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import styles from "../styles/SocialLinks.module.css";

const FacebookLinkIcon = ({ src }) => {
    return (
      <a href={src} className={`${styles.icons_footer} facebook-icon border rounded-circle me-3`}>
        <span>
          <i className="fa fa-facebook-f p-1"></i>
        </span>
      </a>
    );
  };
  
  const WhatsappLinkIcon = ({ src }) => {
    return (
      <a href={src} className={`${styles.icons_footer} whatsapp-icon border rounded-circle me-3`}>
        <span>
          <WhatsAppIcon sx={{ fontSize: 20 }} />
        </span>
      </a>
    );
  };
  
  const TwitterLinkIcon = ({ src }) => {
    return (
      <a href={src} className={`${styles.icons_footer} twitter-icon border rounded-circle me-3`}>
        <span>
          <TwitterIcon sx={{ fontSize: 20 }} />
        </span>
      </a>
    );
  };
  
  const InstagramLinkIcon = ({ src }) => {
    return (
      <a
        href={src}
        className={`${styles.icons_footer} instagram-icon border rounded-circle me-3`}
      >
        <span>
          <InstagramIcon sx={{ fontSize: 20 }} />
        </span>
      </a>
    );
  };
  

const SocialLinks = {
    FacebookLinkIcon,
    TwitterLinkIcon,
    WhatsappLinkIcon,
    InstagramLinkIcon
}

module.exports = SocialLinks