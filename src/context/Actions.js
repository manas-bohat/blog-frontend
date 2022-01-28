export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (user) => ({
    type: "LOGIN_FAILURE"
})

export const Logout = (user) => ({
    type: "LOGOUT"
})

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START"
});

export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user
});

export const UpdateFailure = (user) => ({
    type: "UPDATE_FAILURE"
})



