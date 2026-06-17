import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findMockAccountByPhone } from '../../../data/mock/authMock';

const OTP_RESEND_SECONDS = 30;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const maskPhoneNumber = phoneNumber =>
  `+91 ${phoneNumber.slice(0, 2)}******${phoneNumber.slice(-2)}`;

export const requestMockOtp = createAsyncThunk(
  'auth/requestMockOtp',
  async (phoneNumber, { rejectWithValue }) => {
    const sanitizedPhone = `${phoneNumber || ''}`.replace(/\D/g, '').slice(0, 10);

    if (sanitizedPhone.length !== 10) {
      return rejectWithValue('Please enter a valid 10-digit mobile number.');
    }

    await wait(700);

    const account = findMockAccountByPhone(sanitizedPhone);

    return {
      account,
      phoneNumber: sanitizedPhone,
      maskedPhone: maskPhoneNumber(sanitizedPhone),
      resendAvailableAt: Date.now() + OTP_RESEND_SECONDS * 1000,
      mockOtpCode: account.otpCode,
    };
  }
);

export const verifyMockOtp = createAsyncThunk(
  'auth/verifyMockOtp',
  async (otpCode, { getState, rejectWithValue }) => {
    const state = getState().auth;
    const sanitizedOtp = `${otpCode || ''}`.replace(/\D/g, '').slice(0, 4);

    if (sanitizedOtp.length !== 4) {
      return rejectWithValue('Please enter the complete 4-digit OTP.');
    }

    await wait(600);

    if (!state.phoneNumber) {
      return rejectWithValue('Please request an OTP first.');
    }

    if (sanitizedOtp !== state.mockOtpCode) {
      return rejectWithValue('Incorrect OTP. Please try again.');
    }

    return {
      user: state.pendingAccount,
      verifiedAt: Date.now(),
    };
  }
);

const initialState = {
  phoneNumber: '',
  maskedPhone: '',
  pendingAccount: null,
  user: null,
  isOtpSent: false,
  isAuthenticated: false,
  mockOtpCode: '',
  resendAvailableAt: null,
  requestStatus: 'idle',
  verifyStatus: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    updateUserProfile(state, action) {
      if (!state.user) {
        return;
      }

      const nextUser = {
        ...state.user,
        ...action.payload,
      };
      const sanitizedPhone = `${nextUser.phoneNumber || ''}`
        .replace(/\D/g, '')
        .slice(0, 10);

      nextUser.phoneNumber = sanitizedPhone;
      state.user = nextUser;
      state.pendingAccount = nextUser;
      state.phoneNumber = sanitizedPhone;
      state.maskedPhone = sanitizedPhone ? maskPhoneNumber(sanitizedPhone) : '';
    },
    resetAuthFlow(state) {
      state.phoneNumber = '';
      state.maskedPhone = '';
      state.pendingAccount = null;
      state.isOtpSent = false;
      state.mockOtpCode = '';
      state.resendAvailableAt = null;
      state.requestStatus = 'idle';
      state.verifyStatus = 'idle';
      state.error = null;
    },
    logout(state) {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(requestMockOtp.pending, state => {
        state.requestStatus = 'loading';
        state.verifyStatus = 'idle';
        state.error = null;
      })
      .addCase(requestMockOtp.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        state.phoneNumber = action.payload.phoneNumber;
        state.maskedPhone = action.payload.maskedPhone;
        state.pendingAccount = action.payload.account;
        state.isOtpSent = true;
        state.isAuthenticated = false;
        state.user = null;
        state.mockOtpCode = action.payload.mockOtpCode;
        state.resendAvailableAt = action.payload.resendAvailableAt;
      })
      .addCase(requestMockOtp.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.payload || 'Unable to send OTP right now.';
      })
      .addCase(verifyMockOtp.pending, state => {
        state.verifyStatus = 'loading';
        state.error = null;
      })
      .addCase(verifyMockOtp.fulfilled, (state, action) => {
        state.verifyStatus = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(verifyMockOtp.rejected, (state, action) => {
        state.verifyStatus = 'failed';
        state.error = action.payload || 'OTP verification failed.';
      });
  },
});

export const { clearAuthError, resetAuthFlow, logout, updateUserProfile } = authSlice.actions;
export const authReducer = authSlice.reducer;
