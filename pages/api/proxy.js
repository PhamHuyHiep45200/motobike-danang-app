// api/proxy.js

export default async function handler(req, res) {
    const url = 'http://13.211.94.23:5000'; // URL của API trên EC2
  
    const response = await fetch(url);
    const data = await response.json();
  
    res.status(200).json(data);
  }
  