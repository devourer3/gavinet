import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from 'axios';
import {RestaurantInterface} from "../interface/restaurant.interface";
import {getCookie, setTokenCookie} from "../utils/cookieUtil";
import * as bcrypt from 'bcrypt';
import {Link, withRouter, useHistory} from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {makeStyles, useTheme} from '@material-ui/styles';
import {Button, Container, Typography} from "@material-ui/core";
import '../static/styles/search.scss'
import icMemo from '../static/images/memo.svg'
import icClose from '../static/images/close.svg'
import icRefresh from '../static/images/refresh.svg'
import {gvRequest} from "../api/api";
import SearchItem from "../components/searchItem";
import ArticlesInterface from "../interface/articles.interface";
import dotenv from "dotenv";
import {RootState} from "../modules/rootReducer";
import {dismissDialog} from "../modules/global.modules";

function Search() {
  const globalState = useSelector(((state: RootState) => state.globals), shallowEqual);
  const dispatcher = useDispatch();
  const {t, i18n} = useTranslation();
  const history = useHistory();
  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    getAllQuestions();
  }, []);

  // const [deleteId, setDeleteId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowDialog, setDialogShow] = useState<boolean>(false);
  const [isShowRefresh, setShowRefresh] = useState<boolean>(false);
  const [item, setItem] = useState<ArticlesInterface[]>([]); // 검색 결과물
  const [search, setSearch] = useState<string>(""); // 검색어
  const [article, setArticle] = useState<any>({ // 작성물
    "articleTitle": "",
    "articleContent": ""
  });

  const getAllQuestions = () => {
    gvRequest('get', 'question')
      .then(value => {
        setItem(value.data.questions);
      })
      .catch(reason => {
        console.log(`FAIL: ${reason}`);
      })
      .finally(() => {
        setShowRefresh(false);
      })
  }

  const onKeyUpEnter = (e: any) => {
    if (search.length > 0) {
      if (e.keyCode !== undefined) {
        if (e.keyCode === 13) {
          searchItem();
        }
        return;
      } else if (e.key !== undefined) {
        if (e.key === 'Enter') {
          searchItem();
        }
        return;
      }
    }
  }

  const searchItem = () => {
    gvRequest('post', 'question/search', {articleTitle: search}, null)
      .then(value => {
        let items: ArticlesInterface[] = value.data.questions;
        items.flatMap((value1, index) => {
          value1.searchKeyword = search;
        })
        if (items.length > 0) {
          setShowRefresh(false);
          setItem(items);
        } else {
          setShowRefresh(true);
          setItem(items);
        }
      })
      .catch(reason => {
        console.log(`ERROR: ${reason}`);
      })
      .finally(() => {
        setSearch("");
      });
  }

  const deleteQuestion = (questionId: string) => {
    gvRequest('delete', `question/delete/${questionId}`, {password: password})
      .then(value => {
        console.log(`VALUE: ${value}`);
        getAllQuestions();
      })
      .catch(err => {
        console.log(`ERR: ${err}`);
      })
      .finally(() => {
        dispatcher(dismissDialog(""));
      })
  }

  const onClickShowAdd = () => {
    setArticle({});
    setDialogShow(!isShowDialog);
  }

  const onChangeTitle = (e: any) => {
    setArticle({...article, "articleTitle": e.target.value});
  }

  const onChangeContent = (e: any) => {
    setArticle({...article, "articleContent": e.target.value});
  }

  const onClickWrite = (e: any) => {
    if(article.articleTitle && article.articleContent)
    if (article.articleTitle.trim().length > 0 && article.articleContent.trim().length > 0) {
      gvRequest('post', 'question/create', article, null)
        .then(value => {
          getAllQuestions();
          // setItem(oldArray => [...oldArray, value.data.questions]); // 기존 state에 push하는 법
        })
        .catch(reason => {
          console.log(`Error: ${reason}`);
        })
        .finally(onClickShowAdd);
    }
  }

  function renderDeletePopup() {
    if (globalState.isShowDialog) {
      return (
        <>
          <div className={"sd-delete"}>
            <div className={"delete-container"}>
              <span className={"delete-title"}>{t('S0004')}</span>
              <form>
                <input
                  type="password"
                  className={"delete-pw"}
                  autoComplete={"on"}
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value)
                  }}/>
              </form>
              <div className={"delete-btn-container"}>
                <span
                  className={"delete-confirm"}
                  onClick={(event => {
                    deleteQuestion(globalState.deleteId)
                  })}>
                  {t('W0005')}
                </span>
                <span
                  className={"delete-cancel"}
                  onClick={(event) => {
                    dispatcher(dismissDialog(""));
                  }}>
                  {t('W0006')}
                </span>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  function renderArticles() {
    if (!isShowRefresh) {
      return (
        <ul className={"search-articles"}>
          {
            item.map(
              (value, index) =>
                <SearchItem key={index}
                            searchKeyword={value.searchKeyword}
                            articleTitle={value.articleTitle}
                            articleContent={value.articleContent}
                            _id={value._id}/>)
          }
        </ul>
      )
    }
  }

  function renderAddDialog() {
    if (isShowDialog) {
      return (
        <div className={"search-dialog"}>
          <div className={"sd-container"}>
            <img
              className={"sd-close"}
              src={icClose}
              onClick={onClickShowAdd}
              alt={""}/>
            <span id={"sd-desc"}>{t('W0001')}</span>
            <input
              className={"sd-title"}
              value={article.articleTitle}
              onChange={(e) => {
                onChangeTitle(e)
              }}
            />
            <span id={"sd-desc"}>{t('W0002')}</span>
            <textarea
              className={"sd-content"}
              value={article.articleContent}
              onChange={(e) => {
                onChangeContent(e)
              }}
            />
            <button
              className={"sd-write"}
              onClick={(e) => {
                onClickWrite(e)
              }}
            >{t('W0003')}</button>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <header className={"search-header"}>
        <input
          className={"search-input"}
          value={search}
          onKeyUp={(e) => {
            onKeyUpEnter(e);
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </header>
      <div className={"search-container"}>
        {renderAddDialog()}
        {renderArticles()}
        {renderDeletePopup()}
        {
          isShowRefresh &&
										<img className={"search-refresh"}
										     src={icRefresh}
										     onClick={(e) => {
                 getAllQuestions();
               }}
										     alt={""}>
										</img>
        }
        <img
          className={"search-add-btn"}
          onClick={onClickShowAdd}
          src={icMemo}
          alt={""}/>
      </div>
    </>
  )
}

export default Search;
