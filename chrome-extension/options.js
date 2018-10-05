// save options to chrome.storage
function save_options() {
    const trainedFor = document.getElementById('trainedFor').value;
    const rating = document.getElementById('rating').value;
    chrome.storage.sync.set({
        trainedFor,
        rating,
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
    chrome.storage.sync.get({
        trainedFor: '',
        rating: 0,
    }, function(items) {
        document.getElementById('trainedFor').value = items.trainedFor;
        document.getElementById('rating').value = items.rating;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);