// save options to chrome.storage
function save_options() {
    const topic = document.getElementById('topic').value;
    const trainedFor = document.getElementById('trainedFor').value;
    const rating = document.getElementById('rating').value;
    const trainedOn = document.getElementById('trainedOn').value;
    const link1 = document.getElementById('link1').value;
    const link2 = document.getElementById('link2').value;
    const link3 = document.getElementById('link3').value;
    const link4 = document.getElementById('link4').value;
    const link5 = document.getElementById('link5').value;
    chrome.storage.sync.set({
        topic,
        trainedFor,
        rating,
        trainedOn,
        link1,
        link2,
        link3,
        link4,
        link5,
    }, function() {
        // update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
  }
  
  // restore select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        topic: '',
        trainedFor: '',
        rating: 0,
        trainedOn: '',
        link1: '',
        link2: '',
        link3: '',
        link4: '',
        link5: '',
    }, function(items) {
        document.getElementById('topic').value = items.topic;
        document.getElementById('trainedFor').value = items.trainedFor;
        document.getElementById('rating').value = items.rating;
        document.getElementById('trainedOn').value = items.trainedOn;
        document.getElementById('link1').value = items.link1;
        document.getElementById('link2').value = items.link2;
        document.getElementById('link3').value = items.link3;
        document.getElementById('link4').value = items.link4;
        document.getElementById('link5').value = items.link5;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);