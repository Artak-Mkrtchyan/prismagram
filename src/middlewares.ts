export const isAuthenticated = (request: any) => {
  if (!request.user) {
    throw Error('You need to log in to perform this action');
  }
};
