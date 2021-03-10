export default (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "Invalid email or pasword";
      case "auth/user-disabled":
        return "This account account has been disabled by an administrator";
      case "auth/network-request-failed":
        return "Oops, something wrong with yuor network. Try later";
      case "auth/email-already-in-use":
        return "The email address is already in use by another account"
      default:
        return "Oops, something went wrong. Try again later";
    }
  };