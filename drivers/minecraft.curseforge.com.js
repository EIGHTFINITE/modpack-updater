/**
 * Driver for downloading from minecraft.curseforge.com
 */
temp.href = current.url + "/files?" + (obj.config["curseforge-version"] ? "filter-game-version=" + obj.config["curseforge-version"] : "");
request(temp.href, function(err, response, html) {
    console.log("[" + iPad + "] Navigating to: " + temp.href);
    if (err) throw err;
    $ = cheerio.load(html);
    temp.href = response.request.uri.protocol + "//" + response.request.uri.host + $("a.overflow-tip.twitch-link").attr("href");
    request(temp.href, function(err, response, html) {
        console.log("[" + iPad + "] Navigating to: " + temp.href);
        if (err) throw err;
        $ = cheerio.load(html);
        temp.md5 = $("span.md5").text().trim();
        temp.file = $("div.info-data.overflow-tip").text().trim();
        if(current.md5 === temp.md5 && current.file === temp.file && fs.existsSync(obj.config.folder + "/" + temp.file)) {
            console.log("[" + iPad + "] " + (current.name ? current.name : current.url) + " is already up to date.");
            return;
        }
        if(current.file && fs.existsSync(obj.config.folder + "/" + current.file)) {
            console.log("[" + iPad + '] Deleting outdated file: "' + current.file + '".');
            fs.unlinkSync(obj.config.folder + "/" + current.file);
        }
        temp.href = response.request.uri.protocol + "//" + response.request.uri.host + $("a.button.fa-icon-download:not(.alt)").attr("href");
        console.log("[" + iPad + "] Downloading: " + temp.href + ' as "' + temp.file + '"');
        request(temp.href).pipe(fs.createWriteStream(obj.config.folder + "/" + temp.file)).on("finish", function() {
            current.md5 = md5File.sync(this.path);
            if (current.md5 !== temp.md5) {
                console.log("[" + iPad + "] MD5 mismatch for " + (current.name ? current.name : current.url) + ". Download failed.");
                throw new Error("MD5 mismatch");
            }
            console.log("[" + iPad + "] " + (current.name ? current.name : current.url) + " has successfully updated. (MD5 matches)");
            current.file = temp.file;
        });
    });
    if (!current.name) current.name = $("h1.project-title").text().trim();
});
