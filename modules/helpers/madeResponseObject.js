module.exports =function showResponse (status, text, ...options ){
    return { status, msg: { text, options}}
};
