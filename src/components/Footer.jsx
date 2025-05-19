import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-200 text-green-800 mt-16 py-8 px-4 shadow-inner font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-xl mb-2">Contact Us</h3>
          <p>Email: tasnimul873@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Terms */}
        <div>
          <h3 className="font-bold text-xl mb-2">Legal</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-green-600 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Return Policy</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-bold text-xl mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-5 text-2xl">
            <a href="#" className="hover:text-green-600 transition" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-600 transition" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="hover:text-green-600 transition" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm mt-10 text-green-700">
        © {new Date().getFullYear()} Garden Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
