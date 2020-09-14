import axios, {AxiosResponse} from 'axios';
import {useTranslation} from "react-i18next";
import * as Global from '../utils/Globals'

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
    console.log('req error', error);
    return error;
  }
};

const gvRequestWithAuth = async (method: string, uri: string, data = {}, options = {}) => {
  return gvRequest(method, uri, data, {...options, ...await getAuthHeader()});
};
