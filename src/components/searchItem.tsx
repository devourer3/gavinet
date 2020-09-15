import React, {useCallback, useEffect, useState, Fragment} from 'react';
import '../static/styles/searchItem.scss'
import articles from '../interface/articles.interface';
import icDelete from '../static/images/close.svg';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules/rootReducer";
import {actionModifyQuestion, actionShowDialog} from "../modules/global.modules";
import icEdit from "../static/images/edit.svg";

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
          // originText.split('/n').map()
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
             dispatcher(actionShowDialog({id: props._id}));
           }}
      />
      <img
        className={"search-edit"}
        src={icEdit}
        alt={""}
        onClick={(event) => {
          dispatcher(actionModifyQuestion({id: props._id, title: props.articleTitle, content: props.articleContent, dialog: true}))
        }}/>
      {colorTitle(props.articleTitle, props.searchKeyword)}
      {colorContent(props.articleContent, props.searchKeyword)}
    </li>
  )
}

export default SearchItem;
