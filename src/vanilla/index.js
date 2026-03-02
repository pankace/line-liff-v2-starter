import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        
        alert("isInClient = " + liff.isInClient());
        
        // Setup share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
          shareBtn.addEventListener('click', shareToChat);
        }
    })
    .catch((error) => {
        console.log(error)
    })
});

function shareToChat() {
  if (!liff.isApiAvailable('shareTargetPicker')) {
    alert('Share feature is not available in this environment');
    return;
  }

  liff.shareTargetPicker([
    {
      type: 'text',
      text: 'Check out this LIFF app! 🚀'
    },
    {
      type: 'text',
      text: window.location.href
    }
  ])
  .then(() => {
    console.log('Message shared successfully');
  })
  .catch((error) => {
    console.error('Error sharing message:', error);
    alert('Failed to share message');
  });
}
