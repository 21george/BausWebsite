// Define the content dynamically
const contactInfo = {
    heroSection: {
      title: "Kontakt",
      description: "Sie möchten gerne einen Termin vereinbaren oder haben eine Frage an mich? Füllen Sie das Kontaktformular aus, und ich melde mich zum nächstmöglichen Zeitpunkt bei Ihnen.",
      subtext: "Wir freuen uns über Ihre Nachricht",
    },
    details: [
      {
        heading: "Rufen Sie uns an",
        content: "0211-51507750",
        additionalInfo: "MO – DO (8UHR – 19UHR)\nFR (8UHR – 16UHR)",
      },
      {
        heading: "Schreiben Sie uns eine Mail",
        content: "info@physiokitchen.de",
        additionalInfo: "24/7/365",
      },
    ],
  };
  
  export default function Kontakti() {
    return (
      <>
        {/* Hero Section */}
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md">
          <div className="space-y-2">
            <a href="#" className="inline-block text-2xl font-semibold sm:text-3xl">
              {contactInfo.heroSection.title}
            </a>
            <p className="dark:text-gray-600">{contactInfo.heroSection.description}</p>
          </div>
          <div className="dark:text-gray-800 text-2xm">
            <p>{contactInfo.heroSection.subtext}</p>
          </div>
        </div>
  
        {/* Contact Details Section */}
        <div className="w-full max-w-7xl grid grid-cols-1 gap-6 p-8 shadow-xl rounded-lg md:grid-cols-2">
          <div className="space-y-8">
            {contactInfo.details.map((item, index) => (
              <div key={index}>
                <p className="text-lg font-semibold">{item.heading}</p>
                <p className="text-2xl font-bold text-green-600">{item.content}</p>
                <p className="text-sm mt-2">{item.additionalInfo}</p>
                {index < contactInfo.details.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  