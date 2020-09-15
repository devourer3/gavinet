import axios, {AxiosResponse} from 'axios';
import {useTranslation} from "react-i18next";
import * as Global from '../utils/Globals'
import {logObjectToJson} from "../utils/Globals";
import {rejects} from "assert";

// const {t, i18n} = useTranslation();

const baseURL = Global.IS_DEV ? "http://localhost:8888" : "https://annoyinggavin.herokuapp.com/"

export const getAuthHeader = () => {
  return {} // get Cookie Token
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  timeoutErrorMessage: 'TIME OUT!!!!'
});

export async function gvRequest(method: string, uri: string, data: any = {}, option: any = {}): Promise<any> {
  try {
    return await axiosInstance({
      method: method,
      url: `${uri}`,
      data,
      ...option
    });
  } catch (error) {
    const err:any = error.response;
    logObjectToJson(err);
    switch (err.status) {
      case 409:
        alert("비밀번호 오류");
        break;
    }
    return Promise.reject("INVALID ERROR");
    // return new DOMException("INVALID ERROR");
  }
};

const gvRequestWithAuth = async (method: string, uri: string, data = {}, options = {}) => {
  return gvRequest(method, uri, data, {...options, ...await getAuthHeader()});
};
