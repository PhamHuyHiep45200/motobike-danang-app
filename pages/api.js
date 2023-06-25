// import axios from 'axios';

// export default async (req, res) => {
//   try {
//     const apiUrl = 'http://13.211.94.23:5000'; // URL của API của bạn

//     // Gửi yêu cầu HTTP tới API và lấy kết quả
//     const response = await axios.get(apiUrl);

//     // Trả về kết quả từ API
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     // Xử lý lỗi nếu có
//     res.status(error.response.status).json(error.response.data);
//   }
// };
export default async function handler(req, res) {
  const url = "http://13.211.94.23:5000"; // URL của API trên EC2

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
