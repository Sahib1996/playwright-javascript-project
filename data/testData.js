// data/testData.js
export const users = {
  standard: {
    username: process.env.SAUCE_USER ?? 'standard_user',
    password: process.env.SAUCE_PASS ?? 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: process.env.SAUCE_PASS ?? 'secret_sauce',
  },
};

export const customer = {
  firstName: process.env.FIRST_NAME ?? 'John',
  lastName:  process.env.LAST_NAME  ?? 'Doe',
  zip:       process.env.ZIP        ?? '12345',
};
