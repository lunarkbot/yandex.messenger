export class BaseApi {
  create(_data?: any) { throw new Error('Not implemented'); }

  request(_data?: any) { throw new Error('Not implemented'); }

  update(_data?: any) { throw new Error('Not implemented'); }

  delete(_data?: any) { throw new Error('Not implemented'); }

  protected async parseJSON(response: Promise<XMLHttpRequest>): Promise<any> {
    const xhr = await response;
    return xhr.response;
  }
}
