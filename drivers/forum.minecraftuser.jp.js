/**
 * Driver for downloading from forum.minecraftuser.jp
 */
request(temp.url, function(err, response, html) {
	console.message(i, "Navigating to '" + shortUrl(temp.url) + "'.");
	if (err) throw err;
	// Hardcoded forum.minecraftuser.jp URLs
	if(temp.name === "StarMiner") {
		temp.url = "https://www.dropbox.com/sh/tvn0t4zofx5vqf5/AAC2dcW--1NoDrBUXCxXEsJGa?dl=0";
		updateFile(i, current, temp, callback);
		return;
	}
	throw new Error("Unreachable");
});
