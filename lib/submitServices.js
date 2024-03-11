export const generateFormData = (args) => {
    const form = new FormData();
    for (let key in args) {
        if (args[key] instanceof FileList) {
            form.append(key, args[key][0])
        }
        if (args[key] && !(args[key] instanceof FileList)) {
            form.append(key, args[key])
        }
    }
    // Display the key/value pairs
    for (var pair of form.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    return form
}

export const handleRejectedThunk = (api_errors, payload) => {
    api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
    // NotifyMessage({
    //     type: "error",
    //     title: "Create Webhook",
    //     description: typeof state.api_errors == 'object' ? ""
    //             })
} 
