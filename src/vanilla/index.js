import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(function() {
        console.log("Success! you can do something with LIFF API here.")
        console.log("isInClient = " + liff.isInClient());
        console.log("loggedIn = " + liff.isLoggedIn());
        
        // Auto-login if not logged in and in LINE client
        if (!liff.isLoggedIn() && liff.isInClient()) {
          console.log("Not logged in, redirecting to login...");
          liff.login();
          return;
        }
        
        // Setup share button
        var shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
          shareBtn.addEventListener('click', shareToChat);
        }
    })
    .catch(function(error) {
        console.log(error)
    })
});

function shareToChat() {
  // Check if user is logged in first
  if (!liff.isLoggedIn()) {
    alert('You need to log in first. Redirecting to login...');
    liff.login();
    return;
  }

  if (!liff.isApiAvailable('shareTargetPicker')) {
    alert('Share feature is not available in this environment');
    return;
  }

  liff.shareTargetPicker([
    {
      type: 'text',
      text: '👋 Hello! This message was shared from my LIFF app 🚀'
    },
    {
      type: 'text',
      text: window.location.href
    }
  ])
  .then(function() {
    console.log('Message shared successfully');
  })
  .catch(function(error) {
    console.error('Error sharing message:', error);
    alert('Failed to share message: ' + error.message);
  });
}
