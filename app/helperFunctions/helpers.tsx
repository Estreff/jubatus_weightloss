export const validateEmail = (email: string) => {
  if (!email) {
    return `Email is Required`;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return `Invalid email address`;
  }
};

export const validatePassword = (password: string, type: string) => {
  if (
    (type === 'login' && typeof password !== 'string') ||
    password.length === 0
  ) {
    return 'Password is required';
  } else if (
    (type === 'register' && typeof password !== 'string') ||
    password.length < 6
  ) {
    return 'Passwords must be at least 6 characters long';
  }
};

export const validateMatchingPasswords = (
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
};

export const validateField = (input: string, response: string) => {
  if (!input || input === 'none') {
    return `${response} is required`;
  }
};
