import axios from "axios";
import { store } from "&store/store";

const { REACT_APP_CONTENT_TYPE_JSON } = process.env;

/**
 * Set up inteceptors for all api requests performed.
 * This is usually used to configure the headers.
 */
axios.interceptors.request.use(
  // Signing and setting headers of requests
  (req) => {
    // Set constant headers
    req.headers["Content-Type"] = REACT_APP_CONTENT_TYPE_JSON;

    // Set auth token
    const token = store?.getState()?.login?.token;
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  }
);
