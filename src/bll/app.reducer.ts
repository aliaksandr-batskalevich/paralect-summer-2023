

export type AppActionType = ReturnType<typeof setIsAppInit>;
type AppStateType = {
    isAppInit: boolean
};

const appInitState: AppStateType = {
    isAppInit: false,
};

export const appReducer = (state: AppStateType = appInitState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case "APP_SET_IS_APP_INIT":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setIsAppInit = (isAppInit: boolean) => {
    return {
        type: 'APP_SET_IS_APP_INIT',
        payload: {isAppInit}
    } as const;
};