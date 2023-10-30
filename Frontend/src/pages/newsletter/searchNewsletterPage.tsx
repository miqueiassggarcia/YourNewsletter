import { BiSearchAlt } from "react-icons/bi"
import "../../styles/newsletter/searchNewsletter.css"
import { FormEvent, useState } from "react"
import api from "../../services/api";
import NewsletterItem, { newsletterProps } from "../../components/NewsletterItem";

export function SearchNewsletterPage() {
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [newsletters, setNewsletters] = useState<newsletterProps[]>([]);

  async function seachForNewsletters(event: FormEvent) {
    event.preventDefault();

    await api.get(`/newsletter_search/?search_query=${search}`, 
    {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      setNewsletters(response.data);
    })
    .catch((error) => {
      alert(error);
    });

    setSearched(true);
  }

  return (
    <div className="container-search-newsletter">
      <form className="wrapper-input-search-newsletter" onSubmit={seachForNewsletters}>
        <input
          className="input-search-newsletter"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <BiSearchAlt size={30} type="submit"/>
      </form>
      {newsletters.map((newsletter) => {
        return <NewsletterItem key={newsletter.id} newsletter={newsletter} />
      })}
      {searched && newsletters.length === 0 && <h1>Nenhum resultado encontrado</h1>}
    </div>
  )
}