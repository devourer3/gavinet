import React, {useEffect, useState} from 'react';
import '../static/styles/searchItem.scss'
import articles from '../interface/articles.interface';

function SearchItem(props: articles) {
  return (
    <li
      id={props._id}
      key={props._id}
      className={"search-item"}>
      <span className={"search-title"}>{props.articleTitle}</span>
      <span className={"search-content"}>{props.articleContent}</span>
    </li>
  )
}

export default SearchItem;
