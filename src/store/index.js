const { configureStore } = require('@reduxjs/toolkit');
const { authReducer } = require('../features/auth/store/authSlice');

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

module.exports = {
  store,
};
