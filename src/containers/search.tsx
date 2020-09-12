import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from 'axios';
import {RestaurantInterface} from "../interface/restaurant.interface";
import {getCookie, setTokenCookie} from "../utils/cookieUtil";
import * as bcrypt from 'bcrypt';
import {Link, withRouter, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles, useTheme} from '@material-ui/styles';
import {Button, Container, Typography} from "@material-ui/core";
import '../static/styles/search.scss'
import icMemo from '../static/images/memo.svg'
import icClose from '../static/images/close.svg'
import icRefresh from '../static/images/refresh.svg'
import {gvRequest} from "../api/api";
import SearchItem from "../components/searchItem";
import ArticlesInterface from "../interface/articles.interface";

// type Props = {
//   button: any,
//   component: any
// }

function Search() {
  const [isShowDialog, setDialogShow] = useState<boolean>(false);
  const [isShowRefresh, setShowRefresh] = useState<boolean>(false);
  const [item, setItem] = useState<ArticlesInterface[]>([]);
  const [search, setSearch] = useState<string>("");
  const [article, setArticle] = useState<object>({
    "articleTitle": "",
    "articleContent": ""
  });
  const {t, i18n} = useTranslation();
  const history = useHistory();

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    getAllQuestions();
    // gvRequest('get', 'question')
    //   .then(value => {
    //     setItem(value.data.questions);
    //   })
    //   .catch(reason => {
    //     console.log(`FAIL: ${reason}`);
    //   })
  }, []);

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
        if (items.length > 0) {
          setShowRefresh(false);
          setItem(items);
        } else {
          setShowRefresh(true);
          setItem(items);
        }
      })
      .catch(reason => {
        console.log(reason);
      })
      .finally(() => {
        setSearch("");
      });
  }

  const onClickShowAdd = () => {
    setDialogShow(!isShowDialog);
  }

  const onChangeTitle = (e: any) => {
    setArticle({...article, "articleTitle": e.target.value});
  }

  const onChangeContent = (e: any) => {
    setArticle({...article, "articleContent": e.target.value});
  }

  const onClickWrite = (e: any) => {
    gvRequest('post', 'question/create', article, null)
      .then(value => {
        console.log(value);
      })
      .catch(reason => {
        console.log(reason);
      })
      .finally(onClickShowAdd);
  }

  function renderArticles() {
    if (!isShowRefresh) {
      return (
        <ul className={"search-articles"}>
          {
            item.map((value, index) => SearchItem(value))
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
              onChange={(e) => {
                onChangeTitle(e)
              }}
            />
            <span id={"sd-desc"}>{t('W0002')}</span>
            <textarea
              className={"sd-content"}
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
