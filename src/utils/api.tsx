import axios from 'axios';
import {
  BINANCE_API_URL,
  FETCH_FAILURE_MESSAGE,
  FETCH_SUCCESS_MESSAGE,
} from './constants';
import Environment from './enums';
import { Ticker } from './interfaces';
import { toast } from 'react-toastify';

const fetchData = async (): Promise<Ticker[] | undefined> => {
  try {
    const response = await axios.get<Ticker[]>(BINANCE_API_URL);
    toast.success(FETCH_SUCCESS_MESSAGE);
    return response.data;
  } catch (error) {
    if (
      process.env.NODE_ENV === Environment.Test ||
      process.env.NODE_ENV === Environment.Development
    ) {
      console.error(`${FETCH_FAILURE_MESSAGE}:`, error);
    }

    toast.error(FETCH_FAILURE_MESSAGE);
    throw error;
  }
};

export default fetchData;
