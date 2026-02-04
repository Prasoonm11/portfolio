export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Contact</h2>

      <p>
        If you’d like to collaborate, discuss a project,
        or just say hello, feel free to reach out.
      </p>

      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Your name" />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Your email" />

        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Your message" />

        <button type="submit" className="btn primary-btn">
          Send Message
        </button>
      </form>
    </section>
  );
}
