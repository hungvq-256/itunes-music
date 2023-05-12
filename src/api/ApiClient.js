import axios from "axios";
import { stringify } from "qs";

export default class ApiClient {
  /**
   * GET function
   *
   * @param url
   * @param params
   */
  static async get(url, params, query = null) {
    let requestUrl = query ? `${url}?${stringify(query)}` : url;

    const domainUrl = "http://itunes.apple.com";
    const tempUrl = domainUrl + requestUrl;
    // eslint-disable-next-line no-control-regex
    const response = await axios.get(tempUrl.replace(/[^\x00-\x7F]/g, ""), {
      params,
      headers: await this.getHeaders(),
    });

    return response;
  }
  static async getHeaders(contentType = "application/x-www-form-urlencoded") {
    return {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    };
  }
}
