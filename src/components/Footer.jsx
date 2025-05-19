import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-200 text-green-800 mt-16 py-8 px-4 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p>Email: tasnimul873@gmail..com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: Dhaka</p>
        </div>
        {/* Social Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="#" className="hover:text-green-600 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-600 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-green-600 transition"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm mt-8 text-green-700">
        © {new Date().getFullYear()} Garden Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
