import url from "url";
import auth from "./auth";

/**
 * Default fetch options
 * @type {Object}
 */
const defaultOptions = {
  mode: "cors",
  cache: "no-cache",
  redirect: "follow",
  referrer: "no-referrer",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

/**
 * Authorized returns true and an access token if someone is authorized
 * @return {Array}
 */
function authorized() {
  const token = localStorage.getItem("token");
  return [!!token, token];
}

/**
 * Handle if token expired and send the request again
 * @param {function} request
 * @return {Promise} response
 */
const handleExpiredToken = (request) => async (response) => {
  if (response.status !== 401) {
    return response;
  }

  await auth.refresh();
  return request(authorize(defaultOptions));
};

/**
 * Autherize with default options
 * @param  {Object} options
 * @return {Object} options
 */
function authorize(options) {
  const [isAuthorized, token] = authorized();

  if (isAuthorized && !options.ignoreAuth) {
    options.headers.token = token;
  }

  return options;
}

/**
 * Create a new fetch request
 * @param  {String} method
 * @param  {String} path
 * @param  {Mixed}  body
 * @param  {Object} [options=defaultOptions]
 * @return {Promise}
 */
async function createRequest(method, path, body, options = defaultOptions) {
  options = authorize(options);

  const request = (options) =>
    fetch(url.resolve("http://localhost:3000/", path), {
      method,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

  return request(options).then(handleExpiredToken(request));
}

export default {
  /**
   * Create a GET request
   * @param  {String} path
   * @param  {Mixed}  body
   * @param  {Object} options
   * @return {Promise}
   */
  get(path, body, options) {
    return createRequest("GET", path, body, options);
  },

  /**
   * Create a POST request
   * @param  {String} path
   * @param  {Mixed}  body
   * @param  {Object} options
   * @return {Promise}
   */
  post(path, body, options) {
    return createRequest("POST", path, body, options);
  },

  /**
   * Create a PUT request
   * @param  {String} path
   * @param  {Mixed}  body
   * @param  {Object} options
   * @return {Promise}
   */
  put(path, body, options) {
    return createRequest("PUT", path, body, options);
  },

  /**
   * Create a DELETE request
   * @param  {String} path
   * @param  {Mixed}  body
   * @param  {Object} options
   * @return {Promise}
   */
  delete(path, body, options) {
    return createRequest("DELETE", path, body, options);
  },
};
