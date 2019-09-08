exports.getMime = function(fs,extName) {
    let data = fs.readFileSync('./mime.json','utf-8');
    let mimes = JSON.parse(data);
    return mimes[extName] || 'text/html'
}