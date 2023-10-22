import { GoCrossReference } from "react-icons/go";

import "../styles/components/newsletterItem.css"

export interface newsletterProps {
  id: number;
  userName: string;
  name: string;
  description: string;
}

interface newsletterItemProps {
  newsletter: newsletterProps;
}

const NewsletterItem: React.FC<newsletterItemProps> = ({newsletter}) => {
  return (
    <div className="result-items-container-search-newsletter">
      <div className="header-search-newsletter">
        <h1 className="title-item-search-newsletter">{newsletter.name}</h1>
        <button type="button" className="button-search-newsletter">
          Se increver
          <GoCrossReference size={20} style={{marginLeft: ".4rem"}}/>
        </button>
      </div>
      <p className="description-item-search-newsletter">{newsletter.description}</p>
    </div>
  )
}

export default NewsletterItem;