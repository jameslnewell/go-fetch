
module.exports = () => {

  /**
   * Perform a HTTP request
   * @param   {string}  method
   * @param   {string}  url
   * @param   {object}  [headers]
   * @param   {*}       [body]
   * @returns {Promise}
   */
  request: function(method, url, headers, body) {
    return new Promise((resolve, reject) => {

      //wrap the request
      const wrappedRequest = new Request({
        method, url, headers, body
      });

      const runAfterMiddleWare = (response) => {
        ware(

          this._after,

          [response],

          (alteredResponse, next) => next(null, alteredResponse),

          (afterError, alteredResponse) => {
            if (afterError) return reject(afterError);
            return resolve(alteredResponse);
          }

        );
      };

      //run the middleware allowing changes to the request
      ware(

        this._before,

        [wrappedRequest],

        (requestOrResponse, next, done) => {
          if (isARequest(requestOrResponse)) {
            next(null, requestOrResponse);
          } else if (isAResponse(requestOrResponse)) {
            done(null, requestOrResponse);
          } else {
            done(new Error('Param is neither a request or response'));
          }
        },

        (beforeError, requestOrResponse) => {

          if (beforeError) {
            return reject(beforeError);
          }

          if (isAResponse(requestOrResponse)) {

            //short circuit the request and run the middleware allowing changes to the response
            runAfterMiddleWare(requestOrResponse);

          } else {

            //check the request has at least a method and a URL set
            if (!requestOrResponse.method) return reject(new Error('@go-fetch/client: Request method is required.'));
            if (!requestOrResponse.url) return reject(new Error('@go-fetch/client: Request URL is required.'));

            //perform the request
            request(
              requestOrResponse.method,
              requestOrResponse.url,
              {
                headers: requestOrResponse.headers,
                body: requestOrResponse.body
              },
              (requestError, res) => {
                if (requestError) return reject(requestError);

                //wrap the response
                const wrappedResponse = new Response({
                  version: res.httpVersion,
                  status: res.statusCode,
                  reason: res.statusMessage,
                  headers: res.headers,
                  body: new Stream(res)
                });

                //run the middleware allowing changes to the response
                runAfterMiddleWare(wrappedResponse);

              }
            );

          }

        }
      );

    });
  }

};