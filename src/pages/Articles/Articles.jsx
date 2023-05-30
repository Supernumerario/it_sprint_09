import { useState, useEffect, useContext  } from 'react';
import { Header, Loader, ArticleSaved } from '../../components';
import { apiCall } from '../../services';
import { SavedArticles } from '../../context';
import styled from "styled-components";



const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 0 auto;
  max-width: 540px;
`;

const SavedArticlesTitle = styled.h3`
  grid-column: 1 / span 12;
  text-align: center;
`;

const ClearArticles = styled.div`
  grid-column: 1 / span 12;
  text-align: center;
`;





function Articles () {

  const { articles, setArticles } = useContext(SavedArticles);
  const [ posts, setPosts ] = useState();
  const [ loading, setLoading ] = useState(true);

  useEffect( () => {
    if (articles.list.length > 0) {
    
      // Build the URL to call
      let baseUrl = `https://www.elmundotoday.com/wp-json/wp/v2/posts?include[]=${articles.list[0]}`
      let joinerParam = "&include[]="
      let secondToFinalIds = articles.list.map ( id => id );
      secondToFinalIds.shift();
      let tailUrl = articles.list.map (
        Id => [joinerParam, Id].join("")
      ).join("");
      let finalUrl = baseUrl + tailUrl;

      async function listCall () {
        let data = await apiCall(finalUrl);
        setPosts(data);
        setLoading (false);
      }
      listCall ();
      
    } else {
      setLoading (false);
    }
  }, [articles.list]);

  function clearArticles() {
    window.localStorage.setItem('articlesList', "");
    setArticles({list: []});
  }

  if ( articles.list.length === 0 ) {
    return (
      <>
        <Header />
        <Main>
          <SavedArticlesTitle>You have no articles saved. Go to feed!</SavedArticlesTitle>
        </Main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Main>
          <ClearArticles>
            <button onClick={clearArticles}>Clear articles</button>
          </ClearArticles>

          { loading ? <Loader /> : posts.map (
            post => <ArticleSaved data={post} key={post.id} />
          )}
        </Main>
      </>
    );
  }

}

export default Articles;