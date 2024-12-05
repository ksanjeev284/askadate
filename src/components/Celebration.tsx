import React, { useEffect, useRef, useState } from 'react';
import { Heart, Download, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { FallingPetals } from './animations/FallingPetals';
import html2canvas from 'html2canvas';
import emailjs from '@emailjs/browser';

interface DateOption {
  icon: JSX.Element;
  title: string;
  description: string;
  time: string;
  location: string;
  note: string;
  image: string;
}

interface CelebrationProps {
  selectedDate: DateOption;
}

export function Celebration({ selectedDate }: CelebrationProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.volume = 0.3;
    audio.play();
    return () => audio.pause();
  }, []);

  const compressImage = (dataUrl: string, maxSizeKb: number = 30): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Start with smaller initial dimensions
        let targetWidth = Math.min(img.width, 800);
        let targetHeight = Math.round((targetWidth * img.height) / img.width);
        
        const compress = () => {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          
          // Try different quality settings until we get under maxSizeKb
          let quality = 0.7;
          let compressedDataUrl: string;
          let sizeInKb: number;
          
          do {
            compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            sizeInKb = (compressedDataUrl.length * 3/4) / 1024;
            quality *= 0.8; // Reduce quality by 20% each iteration
          } while (sizeInKb > maxSizeKb && quality > 0.1);

          if (sizeInKb > maxSizeKb) {
            // If still too large, reduce dimensions and try again
            targetWidth *= 0.8;
            targetHeight *= 0.8;
            
            if (targetWidth < 200) {
              // If dimensions get too small, just return the smallest possible version
              resolve(compressedDataUrl);
            } else {
              compress();
            }
          } else {
            resolve(compressedDataUrl);
          }
        };
        
        compress();
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    });
  };

  const validateEmail = (email: string) => {
    // RFC 5322 compliant email regex
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const captureTicket = async () => {
    if (!ticketRef.current) return null;
    try {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
        logging: true
      });
      return canvas.toDataURL('image/jpeg', 0.8);
    } catch (error) {
      console.error('Error capturing ticket:', error);
      return null;
    }
  };

  const sendEmail = async (imageDataUrl: string) => {
    try {
      setSending(true);

      // Clean and validate email
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !validateEmail(cleanEmail)) {
        throw new Error('Please enter a valid email address');
      }
      
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      
      if (!publicKey || !serviceId || !templateId) {
        throw new Error('EmailJS configuration is missing');
      }

      // Initialize EmailJS with your public key
      emailjs.init(publicKey);

      // Prepare template parameters with minimal required fields
      const templateParams = {
        to_email: cleanEmail,
        date_title: selectedDate.title,
        date_time: selectedDate.time,
        date_location: selectedDate.location,
        date_note: selectedDate.note,
        subject: "Special Date Invitation"
      };

      console.log('Sending email with parameters:', {
        email: cleanEmail,
        service_id: serviceId,
        template_id: templateId
      });

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);
      setEmailSent(true);
      setShowEmailForm(false);
      setEmail('');
    } catch (error: any) {
      console.error('Error details:', {
        message: error.message,
        text: error.text,
        name: error.name,
        response: error.response
      });
      
      let errorMessage = 'Failed to send email. ';
      if (error.text) {
        errorMessage += error.text;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again later.';
      }
      
      alert(errorMessage);
    } finally {
      setSending(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#fff1f2',
        scale: 2,
        logging: true,
        foreignObjectRendering: true
      });

      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      await sendEmail(imageDataUrl);
    } catch (error) {
      console.error('Error capturing ticket:', error);
      // Try sending email without the image if capture fails
      await sendEmail('');
    }
  };

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = selectedDate.image;
      });

      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-ticket]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.backgroundColor = '#ffffff';
          }
        }
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'date-ticket.png';
      link.click();
    } catch (error) {
      console.error('Error generating ticket:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 py-16 px-4"
    >
      <FallingPetals />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <Heart className="w-24 h-24 text-rose-500 mx-auto mb-8" />
        </motion.div>

        <h2 className="text-5xl font-dancing text-rose-700 mb-8">
          Yay! It's a Date! 🎉
        </h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
        >
          <div 
            ref={ticketRef}
            data-ticket
            className="border-4 border-rose-200 rounded-xl p-6 relative overflow-hidden bg-white"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-repeat" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF69B4' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                  transform: 'rotate(45deg)',
                }} 
              />
            </div>

            {/* Ticket Content */}
            <div className="relative z-10">
              <h3 className="text-3xl font-dancing text-rose-600 mb-4">
                Date Ticket
              </h3>
              <div className="space-y-4">
                <div className="w-full h-48 relative">
                  <img 
                    src={selectedDate.image} 
                    alt={selectedDate.title}
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                    style={{ objectPosition: '50% 50%' }}
                  />
                </div>
                <p className="text-xl font-semibold text-gray-800">{selectedDate.title}</p>
                <p className="text-gray-600">🕒 {selectedDate.time}</p>
                <p className="text-gray-600">📍 {selectedDate.location}</p>
                <p className="text-rose-500 italic mt-4">"{selectedDate.note}"</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -left-4 top-1/2 w-8 h-8 bg-rose-100 rounded-full transform -translate-y-1/2" />
              <div className="absolute -right-4 top-1/2 w-8 h-8 bg-rose-100 rounded-full transform -translate-y-1/2" />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadTicket}
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full
                     hover:bg-rose-600 transition-colors duration-300 shadow-lg"
          >
            <Download className="w-5 h-5" />
            Save Ticket
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEmailForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-400 text-white rounded-full
                     hover:bg-rose-500 transition-colors duration-300 shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Email Ticket
          </motion.button>
        </div>

        {/* Email Form Modal */}
        {showEmailForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-2xl font-dancing text-rose-600 mb-4">
                Send Ticket via Email
              </h3>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 
                             disabled:bg-rose-300 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Success Toast */}
        {emailSent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Email sent successfully! ✨
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}