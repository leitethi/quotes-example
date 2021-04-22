module.exports = {
  route: {
    success: {
      message: 'route.success',
      status: 200,
    },
    error: {
      status: 500,
      message: 'route.error',
    },
    validationFailed: {
      status: 422,
      message: 'route.validationFailed'
    },
    notFound: {
      status: 404,
      message: 'route.notFound'
    }
  },
};
