const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export const isEmailValid = email => emailRegex.test(email);