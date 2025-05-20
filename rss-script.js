
document.addEventListener("DOMContentLoaded", function () {
    const feedUrl = "https://rss.app/feeds/i9XYWf2Y7v2eV4fG.xml";
    const container = document.getElementById("video-container");
    fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(feedUrl))
        .then(response => response.json())
        .then(data => {
            if (!data.items) {
                container.innerHTML = "<p>Failed to load videos.</p>";
                return;
            }
            let latest = data.items[0];
            if (document.getElementById("latest-video")) {
                document.getElementById("latest-video").innerHTML = `
                    <h2>${latest.title}</h2>
                    <iframe width="560" height="315" src="${latest.link.replace('https://rumble.com/', 'https://rumble.com/embed/')}" frameborder="0" allowfullscreen></iframe>
                `;
            }

            data.items.forEach(item => {
                const videoDiv = document.createElement("div");
                videoDiv.className = "video";
                videoDiv.innerHTML = `
                    <h3>${item.title}</h3>
                    <iframe width="560" height="315" src="${item.link.replace('https://rumble.com/', 'https://rumble.com/embed/')}" frameborder="0" allowfullscreen></iframe>
                `;
                container.appendChild(videoDiv);
            });
        })
        .catch(err => {
            container.innerHTML = "<p>Error fetching feed.</p>";
        });
});
