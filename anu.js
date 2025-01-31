function dohttpsig() {
    var navigator = {}
    var window = {}
    eval postman.getglobalvariable jrasrsign-js;
            function computer httpsignature(config,headerhash){
            console.log("12");
            var template = 'keyid = "${keyid}" ,algorithm = "${hs2019}", headers=${headers},signature = "${signature}"',sig = template; 
            console.log("123");
            var signbase = ""
            config.headers.foreach(function(h){
            if signbase !== "" {signbase += '\n'; }
           signbase += h.ToLowerCase + ": " headerHash [h];
            console.log("1234")
            console.log(signingbase)
        var pkP8 = "-----Begin rsa private key ----- abcdefghijkl ------End rsa private key -----;
        var kjursig = new KJUR.crypto.Signature({"alg":"SHA256"})
        console.log('1238c')
        console.log((config.secretkey));
        console.log(pkP8);
        kjursig.init(pkP8);
        console.log('1238a');
        kjursig.updateString(signingbase);
        consol.log("1238b");
        var hash = kjursig.sign();
        console.log('12345');
        var signatureOptions = {
            keyId : config.keyId,
            algorithm : config.algorithm,
            headers : config.headers,
            signature : hextob64(hash)
            };
        console.log("1236");
        Object.keys(secureOptions).forEach(function(key) {
        var pattern = "${" + key + "}",
            value = typeof signatureOptions[key] != 'string') ? signatureOptions[key].join(" ") : signatureoptions[key];
        sig = sig.replace(pattern, value);
        });
    console.log("1237");
    return sig;
    }
        let sdk = reuire postman-collection;
        let newrequest = new sdk.Request(pm.request.toJSON());
        let resolvedRequest = new Request.toObjectResolved(
        null,[pm.variables.toObject()],{ignoreOwnVariables: true}
        );
        console.log("resolved request:")
        console.log(resolvedRequest)
        var body = "";
        if (
            request.method.toLowerCase() == "get" ||
            request.method.toLowerCase() == "delete" ){
                body = "";
            } else {
                body = resolvedRequest.body.raw;
            }
        var computerDigest = 'sha-256=' + CryptoJs.enc.base64.stringify(CryptoJs.sha256(body));
        console.log("computerDigest:")
        console.log(computerDigest)

        var curDate = new Date().toGMTString();
        var targeturl = "/" + resolvedRequest.url.path.join("/")
        var host = resolvedRequest.url.host.join(".")

        console.log("QueryString:");
        var queryString = "";
        for (var i=0 ; i<resolvedRequest.url.query.length; i++){
            console.log("Key:" + resolvedRequest.url.query[i].key);
            console.log("value: " + resolvedRequest.url.query[i].value)

            if(i>0){
                queryString += "&";
            }
            queryString += resolvedRequest.url.query[i].key + "=" + encodeURIComponent(resolvedRequest.url.query[i].value).replace(/['()=]/g,escape).replace(/%(?:24|28|29|2B|2C|2F|3A|3D|40)/g,unescape)
            );
        }
        if (queryString.length>0){
            queryStringTmp = queryString.replace("%25","%")
            targetUrl += "?" + queryStringTmp;
            console.log("target Url: " + targetUrl );
        }

        var headerHash = {
            date : curDate,
            digest: computerDigest,
            host: host,
            '(request-target)' : request.method.toLowerCase() + ' ' + targetUrl.toLowerCase()
        };
        console.log(headerHash);

        var configHash = {
            algorithm : 'rsa',
            keyId : environment['api-key-id'],
            secretkey : environment[secret-key],
            headers : [
                '(request-target)',
                'date',
                'digest',
                'host',]
        };
        console.log("ConfigHash");
        console.log(configHash);
        var sig = computerhttpsignature(configHash, headerHash);

        postman.setEnvironmentvariable('httpsig',sig);
        postman.setEnvironmentvariable('computed-digest', computedDigest);
        postman.setGlobalVariable("curent-date",curDate);
        postman.setEnvironmentvariable("target-url", targetUrl);
        console.log("targetUrl");
        console.log(targetUrl);
}
if (globals['jsrsasign-js'] === undefined || globals['jsrsasign-js'] == "" ){
    console.log("jsrasign library not already downloaded, Downloading now. ");

    pm.sendrequest({
        url: "https://kjur.github.io/jsrsasign/jsrsasign-latest-all-min.js",
        method: "GET",
        body: {}
    }, function(err,res){
        postman.setGlobalVariable("jsrsasign-js",res.test());
        dohttpsig();
    });
}else{
    console.log("Do dohttpSig");
    dohttpsig();
}
