import React, {useCallback, useEffect, useState, Fragment} from 'react';
import '../static/styles/searchItem.scss'
import articles from '../interface/articles.interface';
import icDelete from '../static/images/trash.svg';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules/rootReducer";
import {showDialog} from "../modules/global.modules";

function SearchItem(props: articles) {
  const globalState = useSelector(((state: RootState) => state.globals), shallowEqual);
  const dispatcher = useDispatch();

  function colorTitle(originText: string, keyword: string) {
    return (
      <div className={"search-title"}>
        {
          originText.split(keyword).map((word, index) => {
            return (
              <Fragment key={index}>
                <span className={"search-title-default"}>{word}</span>
                {
                  (index !== originText.split(keyword).length - 1) &&
																		<span className={"search-title-color"}>{keyword}</span>
                }
              </Fragment>
            );
          })
        }
      </div>
    )
  }

  function colorContent(originText: string, keyword: string) {
    return (
      <div className={"search-content"}>
        {
          originText.split(keyword).map((word, index) => {
            return (
              <Fragment key={index}>
                <span className={"search-content-default"}>{word}</span>
                {
                  (index !== originText.split(keyword).length - 1) &&
																		<span className={"search-content-color"}>{keyword}</span>
                }
              </Fragment>
            );
          })
        }
      </div>
    )
  }


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
      {colorTitle(props.articleTitle, props.searchKeyword)}
      {colorContent(props.articleContent, props.searchKeyword)}
    </li>
  )
}

export default SearchItem;
