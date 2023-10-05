import { BiSearchAlt } from "react-icons/bi"
import { GoCrossReference } from "react-icons/go"
import "../styles/searchNewsletter.css"
import { useState } from "react"
import api from "../services/api";

interface newsletterProps {
  name: String;
  description: String;
}

export function SearchNewsletterPage() {
  const [search, setSearch] = useState("");
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);

  async function seachForNewsletters() {
    const response = await api.get("newsletter", {
      params: {
        search
      }
    })

    setNewsletters(response.data);
  }

  return (
    <div className="container-search-newsletter">
      <div className="wrapper-input-search-newsletter">
        <input
          className="input-search-newsletter"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <BiSearchAlt size={30} onClick={seachForNewsletters}/>
      </div>
      {newsletters.map((newsletter) => {
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
      })}
    </div>
  )
}