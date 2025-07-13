import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message! I'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Let's Work Together</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss your next video project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="bg-gray-800 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">{profileData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Quick Call</p>
                    <Button
                      variant="link"
                      className="text-white font-medium p-0 h-auto hover:text-indigo-400"
                    >
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-semibold text-white mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {profileData.socials.instagram && (
                  <a
                    href={profileData.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                )}
                
                {profileData.socials.twitter && (
                  <a
                    href={profileData.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                )}
                
                {profileData.socials.linkedin && (
                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
