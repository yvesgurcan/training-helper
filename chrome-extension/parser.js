const HOST_PROD = 'http://dashboard.cbtn-tools-prod.local';
const HOST_QA = 'http://dashboard.cbtn-tools-qa.local';
const HOST_DEV = 'http://localhost:8080';
const ROUTE = '/training/submit';
const BASE_URL = `${HOST_QA}${ROUTE}`;

function getTopic() {
    // opengraph first because of github repos' metadata
    let topic = $("meta[property='og:title']").attr('content');

    // header
    if (!topic) {
        topic = $("title").html();
    }

    // meta
    if (!topic) {
        topic = $("meta[name='title']").attr('content');
    }

    // twitter
    if (!topic) {
        topic = $("meta[name='twitter:title']").attr('content');
    }

    return topic;
}

function encode(string) {
    return encodeURIComponent(string);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const { event } = request;
        if (event === 'click') {
            console.log('parsing current page...');

            const link = document.location.href;
            let topic = getTopic();
            console.log({ link, topic });

            const parameters =
                `?topic=${encode(topic)}` + 
                `&link=${encode(link)}`;

            const dashboardUrl = `${BASE_URL}${parameters}`;
            console.log(`new tab will open at '${dashboardUrl.replace(/\s/g,'%20')}'`);

            chrome.runtime.sendMessage({ event: 'open_dashboard', url: dashboardUrl });
        }
    }
);
