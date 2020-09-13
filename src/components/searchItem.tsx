import React, {useCallback, useEffect, useState} from 'react';
import '../static/styles/searchItem.scss'
import articles from '../interface/articles.interface';
import icDelete from '../static/images/trash.svg';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules/rootReducer";
import {showDialog} from "../modules/global.modules";

function SearchItem(props: articles) {
  const globalState = useSelector(((state: RootState) => state.globals), shallowEqual);
  const dispatcher = useDispatch();
  return (
    <li
      id={props._id}
      key={props._id}
      className={"search-item"}>
      <img className={"search-trash"}
           src={icDelete}
           alt={""}
           onClick={(event) => {
             dispatcher(showDialog(props._id));
           }}
      />
      <span className={"search-title"}>{props.articleTitle}</span>
      <span className={"search-content"}>{props.articleContent}</span>
    </li>
  )
}

export default SearchItem;
