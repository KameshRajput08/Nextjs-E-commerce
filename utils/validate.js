export default function login_validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 5 || values.password.length > 20) {
        errors.password = "Must be greater then 8 and less then 20 characters long";
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
    }

    return errors;

}

export function registerValidate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = "Required";
    } else if (values.name.includes(" ")) {
        errors.name = "Invalid Username...!"
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 5 || values.password.length > 20) {
        errors.password = "Must be greater then 8 and less then 20 characters long";
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
    }

    // validate confirm password
    if (!values.cpassword) {
        errors.cpassword = "Required";
    } else if (values.password !== values.cpassword) {
        errors.cpassword = "Password Not Match...!"
    } else if (values.cpassword.includes(" ")) {
        errors.cpassword = "Invalid Confirm Password"
    }

    return errors;
}

export function shippingValidate(values) {
    const errors = {};

    if (!values.fullName || values.fullName === "") {
        errors.namfullNamee = "Required";
    }

    if (!values.address || values.address === "") {
        errors.address = "Required";
    }


    if (!values.city || values.city === "") {
        errors.city = "Required";
    }

    if (!values.postalCode || values.postalCode === "") {
        errors.postalCode = "Required";
    }
    if (!values.country || values.country === "") {
        errors.country = "Required";
    }

    return errors
}