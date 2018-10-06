const HOST_PROD = 'http://dashboard.cbtn-tools-prod.local';
const HOST_QA = 'http://dashboard.cbtn-tools-qa.local';
const HOST_DEV = 'http://localhost:8080';
const ROUTE = '/training/submit';
const BASE_URL = `${HOST_DEV}${ROUTE}`;

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

function getTrainedFor(trainedFor) {
    if (isNaN(trainedFor)) {
        return 0;
    }

    return trainedFor;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const { event } = request;
        if (event === 'click') {
            console.log('parsing current page...');

            const link = document.location.href;
            let topic = getTopic();

            chrome.storage.sync.get({
                trainedFor: 0,
                rating: 0,
            }, function(items) {
                const { trainedFor, rating } = items;
                console.log({ link, topic });

                const parameters =
                `?topic=${encode(topic)}` + 
                `&link=${encode(link)}` + 
                `&trainedFor=${encode(getTrainedFor(trainedFor))}` + 
                `&rating=${encode(rating)}`;

                const dashboardUrl = `${BASE_URL}${parameters}`;
                console.log(`new tab will open at '${dashboardUrl.replace(/\s/g,'%20')}'`);

                chrome.runtime.sendMessage({ event: 'open_dashboard', url: dashboardUrl });
            });


        }
    }
);
