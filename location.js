async function sendLocationToTelegram(orderId){
  if(!navigator.geolocation){
    alert('Geolocation not supported');
    return;
  }
  navigator.geolocation.getCurrentPosition(async (pos)=>{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const BOT_TOKEN = '8589527391:AAEF3bCeKx0J-y9dc0KHeJCOolzHLJjYVo4';
    const CHAT_ID = '7681046220';
    const locationUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    const text = `New order #${orderId} placed!\nLocation: ${locationUrl}`;
    try{
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({chat_id: CHAT_ID, text})
      });
      alert('Location sent to Telegram!');
    }catch(e){
      console.error(e);
      alert('Failed to send location');
    }
  }, (err)=>{
    alert('Location permission denied');
    console.error(err);
  }, { enableHighAccuracy:true });
}