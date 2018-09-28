const HOST_PROD = 'http://dashboard.cbtn-tools-prod.local';
const HOST_QA = 'http://dashboard.cbtn-tools-qa.local';
const HOST_DEV = '';
const ROUTE = '/training/submit';
const BASE_URL = `${HOST_DEV}${ROUTE}`;

function getPageTitle() {
    // opengraph first because of github repos' metadata
    let title = $("meta[property='og:title']").attr('content');

    // header
    if (!title) {
        title = $("title").html();
    }

    // meta
    if (!title) {
        title = $("meta[name='title']").attr('content');
    }

    // twitter
    if (!title) {
        title = $("meta[name='twitter:title']").attr('content');
    }

    return title;
}

function encode(string) {
    return encodeURIComponent(string);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const { event } = request;
        if (event === 'click') {
            console.log('parsing current page...');

            const url = document.location.href;
            let title = getPageTitle();
            console.log({ url, title });

            const parameters =
                `?url=${encode(url)}` +
                `&title=${encode(title)}`;

            const dashboardUrl = `${BASE_URL}${parameters}`;
            console.log(`new tab will open at '${dashboardUrl.replace(/\s/g,'%20')}'`);

            chrome.runtime.sendMessage({ event: 'open_dashboard', url: dashboardUrl });
        }
    }
);
