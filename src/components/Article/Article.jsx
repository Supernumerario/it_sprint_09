import { useState, useContext } from 'react';
import { parseHtml } from '../../utils';
import { SavedArticles } from '../../context';
import styled from "styled-components";



const StyledArticle = styled.div`
  grid-column: 1 / span 12;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  display: block;
  cursor: pointer;
  background-color: #333;
  padding: 24px;
  border-radius: 8px;
  user-select: none;
  &:hover {
	  background-color: #444;
  }
  &.active {
    background-color: #fade4b;
    color: #222;
  }
`;



function Article (post) {

  const { articles, setArticles } = useContext(SavedArticles);

  let isSaved = Object.values(articles.list).includes(post.data.id)? true : false;
  const [ checked, setChecked ] = useState(isSaved);

  function handleArticle(id) {

    if (articles.list.includes(id)) {
      let newArticles = articles.list.filter(art => art !== id);
      setArticles((prevArticles) => ({...prevArticles, "list" : newArticles }));
      window.localStorage.setItem('articlesList', newArticles);
      setChecked(!checked);
    } else {
      setArticles((prevArticles) => ({...prevArticles, "list" : [...articles.list, id] }));
      window.localStorage.setItem('articlesList', [...articles.list, id]);
      setChecked(!checked);
    }
  }

  return (
    <StyledArticle>
      <StyledInput type="checkbox" id={post.data.id} name={post.data.id} checked={checked} onChange={(e) => handleArticle(Number(e.target.name))} />
      <StyledLabel htmlFor={post.data.id} className={`${checked ? "active" : ""}`}>{parseHtml(post.data.title.rendered)}</StyledLabel>
    </StyledArticle>
  );

}

export default Article;