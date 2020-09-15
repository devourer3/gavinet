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
import {
  actionDismissDialog,
  actionModifyContent,
  actionModifyQuestion,
  actionModifyTitle
} from "../modules/global.modules";

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

  const deleteQuestion = (deleteId: string) => {
    gvRequest('delete', `question/delete/${deleteId}`, null, {headers: {deletePw: password}})
      .then(value => {
        getAllQuestions();
        dispatcher(actionDismissDialog());
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
      })
  }

  const onClickShowAdd = () => {
    setArticle({});
    setDialogShow(!isShowDialog);
  }

  const onChangeMTitle = (e:any) => {
    dispatcher(actionModifyTitle({title: e.target.value}));
  }

  const onChangeMContent = (e:any) => {
    dispatcher(actionModifyContent({content: e.target.value}));
  }

  const onChangeTitle = (e: any) => {
    setArticle({...article, "articleTitle": e.target.value});
  }

  const onChangeContent = (e: any) => {
    setArticle({...article, "articleContent": e.target.value});
  }

  const onClickWrite = (e: any) => {
    if (article.articleTitle && article.articleContent && password.trim().length > 0)
      if (article.articleTitle.trim().length > 0 && article.articleContent.trim().length > 0) {
        gvRequest('post', 'question/create', article, {headers: {createPw: password}})
          .then(value => {
            onClickShowAdd();
            getAllQuestions();
            // setItem(oldArray => [...oldArray, value.data.questions]); // 기존 state에 push하는 법
          })
          .catch(reason => {
            console.log(`Error: ${reason}`);
          })
          .finally();
      }
  }

  const onClickModify = (e: any) => {
    if (globalState.titleModified && globalState.contentModified && password.trim().length > 0)
      if (globalState.titleModified.trim().length > 0 && globalState.contentModified.trim().length > 0) {
        gvRequest('put', `question/modify/${globalState.modifyId}`, {articleTitle: globalState.titleModified, articleContent: globalState.contentModified}, {
          headers: {
            modifyPw: password
          }
        })
          .then(value => {
            dispatcher(actionModifyQuestion({dialog: false}));
            getAllQuestions();
            // setItem(oldArray => [...oldArray, value.data.questions]); // 기존 state에 push하는 법
          })
          .catch(reason => {
            console.log(`Error: ${reason}`);
          })
          .finally();
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
                  autoComplete={"on"}
                  className={"delete-pw"}
                  value={password || ""}
                  onChange={event => {
                    setPassword(event.target.value)
                  }}/>
              </form>
              <div className={"delete-btn-container"}>
                <span
                  className={"delete-confirm"}
                  onClick={(event => {
                    deleteQuestion(globalState.deleteId);
                  })}>
                  {t('W0005')}
                </span>
                <span
                  className={"delete-cancel"}
                  onClick={(event) => {
                    dispatcher(actionDismissDialog());
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
              value={article.articleTitle || ""}
              onChange={(e) => {
                onChangeTitle(e)
              }}
            />
            <span id={"sd-desc"}>{t('W0002')}</span>
            <textarea
              className={"sd-content"}
              value={article.articleContent || ""}
              onChange={(e) => {
                onChangeContent(e)
              }}
            />
            <span id={"sd-desc"}>{t('W0007')}</span>
            <form className={"sd-pw-form"}>
              <input
                className={"sd-password"}
                value={password || ""}
                type="password"
                autoComplete={"on"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </form>
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

  function renderModifyDialog() {
    if (globalState.isModifyDialog) {
      return (
        <div className={"search-dialog"}>
          <div className={"sd-container"}>
            <img
              className={"sd-close"}
              src={icClose}
              onClick={(e) => {
                dispatcher(actionModifyQuestion({dialog: false}));
              }}
              alt={""}/>
            <span id={"sd-desc"}>{t('W0001')}</span>
            <input
              className={"sd-title"}
              value={globalState.titleModified || ""}
              onChange={(e) => {
                onChangeMTitle(e)
              }}
            />
            <span id={"sd-desc"}>{t('W0002')}</span>
            <textarea
              className={"sd-content"}
              value={globalState.contentModified || ""}
              onChange={(e) => {
                onChangeMContent(e)
              }}
            />
            <span id={"sd-desc"}>{t('W0007')}</span>
            <form className={"sd-pw-form"}>
              <input
                className={"sd-password"}
                value={password || ""}
                type="password"
                autoComplete={"on"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </form>
            <button
              className={"sd-modify"}
              onClick={(e) => {
                onClickModify(e)
              }}
            >{t('W0008')}</button>
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
        {renderModifyDialog()}
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
