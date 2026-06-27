"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { Globe } from "@/components/ui/Globe";
import BlurText from "@/components/ui/BlurText";

export default function Contact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen relative selection:bg-primary/30 pt-24 pb-12 px-4 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
          
          {/* Contact Info & Globe */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 flex flex-col justify-center h-full"
          >
            <div>
              <BlurText 
                text="Let's Connect" 
                className="text-4xl md:text-5xl font-bold mb-6" 
                animateBy="letters" 
                delay={50}
              />
              <BlurText 
                text="Have a project in mind or just want to chat? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions."
                className="text-lg text-muted-foreground mb-8"
                animateBy="words"
                delay={20}
              />
            </div>

            {/* Interactive Globe */}
            <div className="w-full relative flex justify-center lg:justify-start py-8">
               <Globe />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ContactLink icon={Mail} label="Email Me" href="mailto:vedanshsharma2805@gmail.com" />
              <ContactLink icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/vedanshsharma2805" />
              <ContactLink icon={Github} label="GitHub" href="https://github.com/VSDeadShot" />
              <ContactLink icon={Twitter} label="Twitter" href="https://twitter.com/Vedansh_Sharma1" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form 
              action="https://api.web3forms.com/submit" 
              method="POST"
              className="p-8 rounded-2xl bg-card/50 border border-white/10 backdrop-blur-md shadow-2xl space-y-6 lg:ml-auto max-w-lg w-full"
            >
              {/* Replace with your Access Key from web3forms.com */}
              <input type="hidden" name="access_key" value="7b374424-06a7-429b-bdff-e3fc35398dc5" />
              
              <BlurText text="Send a Message" className="text-2xl font-bold mb-6" animateBy="words" />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  placeholder="Vedansh Sharma"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="vedansh@example.com"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>

              {/* Optional: Redirect after success */}
              <input type="hidden" name="redirect" value="https://web3forms.com/success" />

              <button
                type="submit"
                className="w-full py-4 bg-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

interface ContactLinkProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

function ContactLink({ icon: Icon, label, href }: ContactLinkProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
        <Icon size={20} />
      </div>
      <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </a>
  );
}
