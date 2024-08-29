export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

// eslint-disable-next-line
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

type Options = {
  method: METHOD;
  [key: string]: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTP {
  protected readonly baseUrl: string;

  constructor(basePath: string) {
    this.baseUrl = `${BASE_URL}/${basePath}`;
  }

  get: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.GET })
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.POST })
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.PUT })
  );

  patch: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.PATCH })
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.DELETE })
  );

  request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, data, type = null } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + url);

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        if (type && type !== 'auto') {
          xhr.setRequestHeader('Content-Type', type);
        } else if (type !== 'auto') {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(data);
      }
    });
  }
}
