import { Header, Loader, Article } from '../../components';
import { useState, useEffect } from 'react';
import { apiCall } from '../../services';
import styled from "styled-components";



const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 0 auto;
  max-width: 540px;
`;

const FeedTitle = styled.h3`
  grid-column: 1 / span 12;
  text-align: center;
`;

const Pagination = styled.div`
  grid-column: 1 / span 12;
  display: flex;
  justify-content: space-between;
  margin: 24px 0 80px;
`;



function Feed () {

  const [ posts, setPosts ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ currentPage, setCurrentPage ] = useState(1);

  useEffect( () => {
    async function listCall () {
      let data = await apiCall(`https://www.elmundotoday.com/wp-json/wp/v2/posts/?page=${currentPage}`);
      setPosts(data);
      setLoading (false);
    }
    listCall ();
  }, [currentPage]);

  function nextPage() {
    setCurrentPage((lastPage) => lastPage + 1);
    setLoading (true);
  }
  
  function previousPage() {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage((lastPage) => lastPage - 1);
      setLoading (true);
    }
  }



  if (loading) {
    return (
      <>
        <Header />
        <Main>
          <Loader />
        </Main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Main>
          <FeedTitle>Select the articles to save in your personal list</FeedTitle>
            { posts.map ( post => <Article data={post} key={post.id} />) }
          <Pagination>
            <button onClick={previousPage}>Previous page</button>
            <button onClick={nextPage}>Next page</button>
          </Pagination>
        </Main>
      </>
    );
  }

}

export default Feed;