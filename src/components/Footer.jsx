import {
  ArrowUp,
  Github,
  Mail,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    // { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: "uigraslasu@gmail.com", href: "mailto:uigraslasu@gmail.com" },
    { icon: <Send size={16} />, text: "@TomasCooper1004", href: "https://t.me/TomasCooper1004" },
    { icon: <Github size={16} />, text: "@tomas0502", href: "https://github.com/tomas0502" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="px-6 py-12 mt-20">
      <div className="max-w-6xl mx-auto relative">
        {/* Glass background container */}
        <motion.div 
          className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 rounded-xl p-8 border border-white/20 dark:border-gray-700/50 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Branding */}
            <motion.div variants={itemVariants} className="space-y-4 text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">TOMAS</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Digital designer & developer creating meaningful experiences.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={itemVariants} className="text-left">
              <h4 className="text-gray-900 dark:text-white font-medium mb-4 text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href={link.href} 
                      className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-sm text-gray-600 dark:text-gray-300"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants} className="text-left">
              <h4 className="text-gray-900 dark:text-white font-medium mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3 flex flex-col items-start">
                {contactInfo.map((info, index) => (
                  <motion.li 
                    key={index}
                    className="cursor-pointer flex items-start space-x-3 text-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-gray-600 dark:text-gray-400 mt-0.5">{info.icon}</span>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-gray-600 dark:text-gray-300"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300">{info.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50 flex flex-col items-center text-xs text-gray-600 dark:text-gray-400 space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-full text-center">
              <p className="text-center">© {currentYear} Tomas. All rights reserved.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="fixed bottom-4 right-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      </motion.div>
    </footer>
  );
};