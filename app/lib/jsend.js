'use strict';

function formatJSend(req, res, body) {
  function formatError(res, body) {
    const isClientError = res.statusCode >= 400 && res.statusCode < 500;
    if (isClientError) {
      return {
        status: 'error',
        message: body.message,
        code: body.code
      };
    } else {
      const inDebugMode = process.env.NODE_ENV === 'development';

      return {
        status: 'error',
        message: inDebugMode ? body.message : 'Internal Server Error',
        code: inDebugMode ? body.code : 'INTERNAL_SERVER_ERROR',
        data: inDebugMode ? body.stack : undefined
      };
    }
  }

  function formatSuccess(res, body) {
    if (body.data && body.pagination) {
      return {
        status: 'success',
        data: body.data,
        pagination: body.pagination,
      };
    }

    return {
      status: 'success',
      data: body
    };
  }

  let response;
  if (body instanceof Error) {
    response = formatError(res, body);
  } else {
    response = formatSuccess(res, body);
  }

  response = JSON.stringify(response);
  res.header('Content-Length', Buffer.byteLength(response));
  res.header('Content-Type', 'application/json');

  return response;
}

module.exports = formatJSend;
