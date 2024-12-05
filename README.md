# 💝 AskaDate - Creative Date Invitation App

A delightful web application that helps you ask someone special out on a date in a fun and creative way! Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎯 9 unique date options with beautiful designs
- 🎨 Interactive date cards with hover effects
- 🎫 Personalized date tickets with dynamic images
- 📧 Email sharing functionality
- 🎵 Celebratory sound effects
- 📱 Responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17.1 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd askadate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update with your EmailJS credentials:
     ```
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     ```

4. Start the development server:
```bash
npm run dev
```

## 📧 Email Configuration

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{to_email}}`: Recipient's email
   - `{{from_name}}`: Sender's name
   - `{{to_name}}`: Recipient's name
   - `{{date_title}}`: Selected date activity
   - `{{date_time}}`: Date and time
   - `{{date_location}}`: Location
   - `{{date_note}}`: Personal note
   - `{{ticket_image}}`: Generated date ticket
   - `{{message}}`: Invitation message

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [EmailJS](https://www.emailjs.com/) - Email Service
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [html2canvas](https://html2canvas.hertzen.com/) - Ticket Generation

## 📱 Features

### Date Options
- Multiple unique date experiences
- Interactive card design
- Hover effects and animations
- Detailed descriptions and locations

### Ticket Generation
- Dynamic ticket creation
- Responsive design
- Custom background and styling
- Image optimization

### Email Functionality
- Secure email sending
- Mobile-responsive templates
- Loading and success states
- Error handling

## 🎨 Design

- Modern and clean interface
- Rose/pink gradient theme
- Responsive mobile-first approach
- Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the amazing styling framework
- [EmailJS](https://www.emailjs.com/) for the email service
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
