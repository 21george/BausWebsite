"use client";
import React from "react";
import { useImpressumData } from "../../../hooks/useImpressumData";

export default function Impresionpage() {
  const { impressumData, loading, error } = useImpressumData();

  // Fallback data in case database is not available
  const fallbackData = {
    company_info: {
      title: "Angaben gemäß § 5 TMG",
      content: "Nikolina Baus\nForstenrieder Allee 140F\n81476 München"
    },
    contact: {
      title: "Kontakt",
      content: "info@baus-physiotherapie.de",
      additionalData: { type: "email", link: "mailto:info@baus-physiotherapie.de" }
    }
  };

  const data = impressumData || fallbackData;

  if (loading) {
    return (
      <main className="w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading impressum...</p>
          </div>
        </div>
      </main>
    );
  }

  const renderContent = (section) => {
    if (!section) return null;
    
    const { content, additionalData } = section;
    
    if (additionalData?.type === "email") {
      return (
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          <a
            href={additionalData.link}
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            {content}
          </a>
        </p>
      );
    }
    
    if (additionalData?.type === "address" || section === data.company_info) {
      return (
        <address className="text-sm sm:text-base md:text-lg not-italic text-gray-600">
          {content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </address>
      );
    }
    
    if (additionalData?.paragraphs > 1) {
      return (
        <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      );
    }
    
    if (additionalData?.type === "text_with_link") {
      const linkText = additionalData.link_text;
      const linkUrl = additionalData.link_url;
      const parts = content.split(linkText);
      
      return (
        <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-600">
          <p>
            {parts[0]}
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors ml-1"
            >
              {linkText}
            </a>
            {parts[1]}
          </p>
        </div>
      );
    }
    
    return (
      <div className="text-sm sm:text-base md:text-lg text-gray-600">
        <p>{content}</p>
      </div>
    );
  };

  return (
    <main className="w-full min-h-screen">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16 py-6 sm:py-12 bg-white">
        <div className="py-12 mt-12 prose max-w-none text-left text-gray-700 mb-1">
          
          {/* Company Info Section */}
          {data.company_info && (
            <section className="space-y-3" aria-labelledby="company-info">
              <h2 className="sm:text-sm text-sm md:text-base lg:text-base font-semibold text-gray-800">
                {data.company_info.title}
              </h2>
              {renderContent(data.company_info)}
            </section>
          )}

          {/* Contact Section */}
          {data.contact && (
            <section className="space-y-3 mt-4" aria-labelledby="contact-info">
              <h2 className="sm:text-sm text-sm md:text-base lg:text-base font-semibold text-gray-800">
                {data.contact.title}
              </h2>
              {renderContent(data.contact)}
            </section>
          )}

          {/* Content Liability Section */}
          {data.content_liability && (
            <section className="space-y-3 mt-4" aria-labelledby="content-liability">
              <h2 className="sm:text-sm text-sm md:text-base lg:text-base font-semibold text-gray-800">
                {data.content_liability.title}
              </h2>
              {renderContent(data.content_liability)}
            </section>
          )}

          {/* Link Liability Section */}
          {data.link_liability && (
            <section className="space-y-3 mt-4" aria-labelledby="link-liability">
              <h2 className="sm:text-sm text-sm md:text-base lg:text-base font-semibold text-gray-800">
                {data.link_liability.title}
              </h2>
              {renderContent(data.link_liability)}
            </section>
          )}

          {/* Copyright Section */}
          {data.copyright && (
            <section className="space-y-3 mt-4" aria-labelledby="copyright">
              <h2 className="sm:text-sm text-sm md:text-base lg:text-base font-semibold text-gray-800">
                {data.copyright.title}
              </h2>
              {renderContent(data.copyright)}
            </section>
          )}

          {/* EU Dispute Section */}
          {data.eu_dispute && (
            <section className="space-y-3 mt-4" aria-labelledby="eu-dispute">
              <h2 className="sm:text-sm text-sm md:text-base lg:text-base font-semibold text-gray-800">
                {data.eu_dispute.title}
              </h2>
              {renderContent(data.eu_dispute)}
            </section>
          )}

          {/* Consumer Dispute Section */}
          {data.consumer_dispute && (
            <section className="space-y-3 mt-4" aria-labelledby="consumer-dispute">
              <h2 className="sm:text-sm text-sm md:text-base lg:text-base font-semibold text-gray-800">
                {data.consumer_dispute.title}
              </h2>
              {renderContent(data.consumer_dispute)}
            </section>
          )}
        </div>

        {/* Footer with Source */}
        <footer className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-center text-gray-500">
            {data.footer_source ? (
              <>
                <strong>{data.footer_source.additionalData?.prefix || "Quelle:"}</strong>{" "}
                <a
                  href={data.footer_source.additionalData?.link_url || "https://www.e-recht24.de"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  {data.footer_source.content}
                </a>
              </>
            ) : (
              <>
                <strong>Quelle:</strong>{" "}
                <a
                  href="https://www.e-recht24.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  e-recht24.de
                </a>
              </>
            )}
          </p>
        </footer>

        {/* Error State */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              {error} - Using fallback content.
            </p>
          </div>
        )}
      </article>
    </main>
  );
}