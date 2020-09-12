import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/styles';
import {Button, Container, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Link, withRouter, useHistory} from 'react-router-dom';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import {RestaurantInterface} from "../interface/restaurant.interface";
import {getCookie, setTokenCookie} from "../utils/cookieUtil";
import {gvRequest} from '../api/api'
import '../static/styles/home.scss'

// type Props = {
//   button: any,
//   component: any
// }

// 인라인 스타일은 자동완성이 안 됨.
// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     flexFlow: "column",
//     height: "100%",
//     alignItems: "center",
//   },
//   button: {
//     width: "200px",
//     marginTop: "40px",
//   }
// }));

function Home() {
  // const classes = useStyles();
  const {t, i18n} = useTranslation();
  // const history = useHistory();
  const history = useHistory();
  const [corpName, setCorpName] = useState("")

  const onChangeName = (e: any) => {
    setCorpName(e.target.value);
  }

  // TODO 헤더에다 토큰 쿠키 넣어서 합시다.
  const sendCorps = (e: any) => {
    axios.post('http://localhost:8888/auth/anonymous',
      {"corpName": corpName})
      .then((response) => {
        setTokenCookie(response.headers.authorization);
        console.log(getCookie());
        axios.post('http://localhost:8888/auth/fuckup', {cookies: getCookie()})
          .then(value => {
            console.log(value);
          })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch(reason => {
        console.log(reason);
      })
  };

  function goPage(destination: string) {
    switch (destination) {
      case 'search':
        history.push('/search');
        break;
      default:
      case 'test':
        history.push('/test');
        break;
    }
  }

  async function getRestaurant() {
    let result = await gvRequest('get', 'restaurant', null, null);
    console.log(result.data);
    // <RestaurantInterface[]>('http://localhost:8888/restaurant')
    //   .then((response) => {
    //     console.log(response.data);
    //   });
  }

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
  }, []);
  return (
    <>
      <div className={"home-container"}>
        <span className={"home-title"}>{t('S0000')}</span>
        <button id={"home-btn"}
                className={"home-cs"}
                onClick={(e) => {
                  goPage('search')
                }}>
          {t('S0001')}
        </button>
        <button id={"home-btn"}
                className={"home-lunch"}>
          {t('S0002')}
        </button>
        <button id={"home-btn"}
                className={"home-what"}
                onClick={(e) => {
                  goPage('test')
                }}>
          {t('S0003')}
        </button>
        <span className={"input-wrapper"}>
          <input className={"corp-form"}
                 onChange={(e) => {
                   onChangeName(e)
                 }}
          />
          <button className={"btn-send"}
                  onClick={(e) => {
                    sendCorps(e)
                  }}>전송</button>
        </span>
      </div>
    </>
  )
}

export default Home;
