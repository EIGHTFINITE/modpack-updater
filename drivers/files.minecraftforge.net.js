/**
 * Driver for downloading from files.minecraftforge.net
 */
if (temp.url.startsWith("http://"))
	temp.url = temp.url.replace("http://", "https://");
if (current.url.startsWith("http://"))
	current.url = current.url.replace("http://", "https://");
request(temp.url, function(err, response, html) {
	console.message(i, "Navigating to: '" + temp.url + "'.", MESSAGE_VERBOSE);
	if (err) throw err;
	var $ = cheerio.load(html);
	temp.url = $(".downloads>.download>.title>" + (temp.preview === true ? ".promo-latest" : ".promo-recommended")).parent().parent().find(".links .link .classifier-installer").parent().attr("href");
	temp.url = temp.url.substring(temp.url.indexOf('&url=') + 5);
	temp.file = temp.url.substring(temp.url.lastIndexOf("/") + 1);
	updateFile(i, current, temp, callback);
	if (!("preview" in current)) current.preview = false;
});
