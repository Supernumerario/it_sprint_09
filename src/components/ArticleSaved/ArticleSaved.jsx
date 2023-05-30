import { useState, useContext } from 'react';
import { parseHtml } from '../../utils';
import { SavedArticles } from '../../context';
import styled from "styled-components";



const StyledArticle = styled.div`
  grid-column: 1 / span 12;
`;

const Content = styled.p`
  display: none;
`;

const Buttons = styled.button`
  margin: 24px 8px 24px 0;
`;

const Hrs = styled.hr`
  opacity: 0.1;
`;


function ArticleSaved (post) {

  const { articles, setArticles } = useContext(SavedArticles);
  const [ articleVisible, setArticleVisible ] = useState(Object.values(articles.list).includes(post.data.id)? true : false);

  function handleRemove() {
    let newArticles = articles.list.map( item => item );
    newArticles = newArticles.filter(
      item => item !== post.data.id
    )
    window.localStorage.setItem('articlesList', newArticles);
    setArticles ({ list: newArticles });
    setArticleVisible (false);
  }

  function handleExpand() {
    document.getElementById(post.data.id).style.display="block";
  }

  if ( articleVisible ) {
    return (
      <StyledArticle>
        {/* <img src={post.data.jetpack_featured_media_url}></img> */}
        <h3>{parseHtml(post.data.title.rendered)}</h3>
        <div>{parseHtml(post.data.excerpt.rendered)}</div>
        <Content id={post.data.id}>{parseHtml(post.data.content.rendered)}</Content>

        <Buttons onClick={handleExpand}>Read more</Buttons>
        <Buttons onClick={handleRemove}>Delete</Buttons>

        <Hrs></Hrs>
      </StyledArticle>
    );
  } else {
    return (<></>);
  }

}

export default ArticleSaved;