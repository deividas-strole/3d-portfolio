import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";


import TitleHeader from "../components/TitleHeader";
import Floating3DModel from "../components/models/Floating3DModel";

// Toast Component
const Toast = ({ message, type = "success", onClose }) => {
  return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
                type === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
            }`}
        >
          <span className="text-xl">{type === "success" ? "✓" : "✕"}</span>
          <p className="font-medium">{message}</p>
          <button
              onClick={onClose}
              className="ml-2 hover:opacity-75 transition-opacity"
          >
            ✕
          </button>
        </div>
      </div>
  );
};

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [messageSent, setMessageSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  const showNotification = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "" });
      setMessageSent(true);
      showNotification("Message sent successfully!", "success");

      setTimeout(() => setMessageSent(false), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      showNotification("Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
      <section id="contact" className="flex-center section-padding">
        {showToast && (
            <Toast
                message={toastMessage}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        )}

        <div className="w-full h-full md:px-10 px-5">
          <TitleHeader
              title="Get in Touch – Let's Connect"
              // sub="💬 Have questions or ideas? Let's talk! 🚀"
          />

          <div className="grid-12-cols mt-16">
            <div className="xl:col-span-5">
              <div className="flex-center card-border rounded-xl p-10">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-7"
                >
                  <div>
                    <label>Your name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                  </div>

                  <div>
                    <label>Your Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                  </div>

                  <div>
                    <label>Your Message</label>
                    <textarea
                        name="message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                  </div>

                  <button type="submit" disabled={loading || messageSent}>
                    {loading ? "Sending..." : messageSent ? "Sent ✓" : "Send"}
                  </button>
                </form>
              </div>
            </div>

            {!isMobile && (
                <div className="xl:col-span-7" style={{ minHeight: "600px" }}>
                  <div className="w-full h-[600px] rounded-3xl overflow-hidden bg-black">
                    <Floating3DModel />
                  </div>
                </div>
            )}

          </div>
        </div>
      </section>
  );
};

export default Contact;