window.Confirm = (msg, callback) => {
    if (wx) {
        wx.showModal({
            title: '提示',
            content: msg,
            success(res) {
                if (res.confirm) {
                    callback(true);
                }
            }
        })
    } else {
        const value = confirm(msg)
        if (value) {
            callback(value);
        }
    }
}

