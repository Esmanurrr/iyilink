import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: "Lütfen tüm zorunlu alanları doldurun.",
      });
      return;
    }

    setSubmitStatus({
      success: true,
      message:
        "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ color: "var(--color-dark-text)" }}
    >
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--color-primary-light)" }}
      >
        İletişim
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div
            className="bg-white shadow-md rounded-lg p-6"
            style={{ backgroundColor: "var(--color-background-alt)" }}
          >
            <h2 className="text-xl font-semibold mb-4">Bize Ulaşın</h2>
            <p className="mb-6">
              Herhangi bir soru, öneri veya işbirliği talebi için aşağıdaki
              formu doldurarak bize ulaşabilirsiniz. En kısa sürede size geri
              dönüş yapacağız.
            </p>

            {submitStatus && (
              <div
                className={`p-4 mb-6 rounded-md ${
                  submitStatus.success ? "bg-green-100" : "bg-red-100"
                }`}
                style={{
                  color: submitStatus.success
                    ? "var(--color-success)"
                    : "var(--color-error)",
                  borderLeft: `4px solid ${
                    submitStatus.success
                      ? "var(--color-success)"
                      : "var(--color-error)"
                  }`,
                }}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    İsim <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    style={{ borderColor: "var(--color-border)" }}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    E-posta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    style={{ borderColor: "var(--color-border)" }}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  style={{ borderColor: "var(--color-border)" }}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">
                  Mesajınız <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-2 border rounded-md"
                  style={{ borderColor: "var(--color-border)" }}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-primary-hover)",
                  color: "white",
                }}
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
