export default (fieldName, value) => {
    if (value.trim()) {
        switch (fieldName) {
            case "email": {
                let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                return emailValid ? "" : "Email is invalid. Please check it";
            }
            case "password":
                let passwordValid = value.length >= 6;
                return passwordValid ? "" : "Password is too short";
            default:
                return "";
        }
    } else {
        return `${fieldName[0].toUpperCase() + fieldName.slice(1)
            } field can\'t be empty`;
    }
};