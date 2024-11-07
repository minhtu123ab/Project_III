import nodemailer from 'nodemailer'

// Tạo cấu hình gửi email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leminhtu1308200333@gmail.com',
    pass: 'yerazovbwvkigdzi'
  }
})

// Hàm gửi email
const sendMail = async (recipientEmail: string, username: string, password: string, name: string) => {
  const mailOptions = {
    from: 'leminhtu1308200333@gmail.com',
    to: recipientEmail,
    subject: 'Thông báo: Tài khoản mới đã được tạo',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #007B7F;">Thông báo từ Quản trị viên</h1>
        <p>Chào bạn, <strong>${name}</strong></p>
        <p>Quản trị viên đã tạo tài khoản cho bạn. Dưới đây là thông tin tài khoản của bạn:</p>
        <p><strong>Tên đăng nhập:</strong> ${username}</p>
        <p><strong>Mật khẩu:</strong> ${password}</p>
        <p>Vui lòng đăng nhập và đổi mật khẩu ngay sau khi bạn lần đầu truy cập vào tài khoản của mình để kích hoạt tài khoản và bảo vệ thông tin cá nhân.</p>
        <p>Trân trọng,<br>Đội ngũ quản lý</p>
      </div>
    `
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ' + info.response)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const sendMailCodePassword = async (recipientEmail: string, code: string) => {
  const mailOptions = {
    from: 'leminhtu1308200333@gmail.com',
    to: recipientEmail,
    subject: 'Thông báo: Mã xác nhận mật khẩu',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #007B7F;">Thông báo từ Quản trị viên</h1>
        <p>Chào bạn!</p>
        <p>Mã xác nhận mật khẩu của bạn là: <strong>${code}</strong></p>
        <p>Vui lòng sử dụng mã này để lấy lại mật khẩu trước khi bạn đăng nhập vào tài khoản của mình.</p>
        <p>Trân trọng,<br>Đội ngũ quản lý</p>
      </div>`
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ' + info.response)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export { sendMail, sendMailCodePassword }
