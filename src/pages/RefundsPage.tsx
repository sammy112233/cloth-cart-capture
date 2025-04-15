
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { refundRequest } from "@/lib/dataLayer";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

export default function RefundsPage() {
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
    reason: "",
    details: ""
  });
  
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "1": true
  });

  const toggleFAQ = (id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track refund request
    refundRequest({
      transaction_id: formData.orderNumber,
      items: [], // Ideally, we would have actual items here
      reason: formData.reason
    });
    
    toast.success("Refund request submitted", {
      description: "We'll process your request and contact you shortly."
    });
    
    // Reset form
    setFormData({
      orderNumber: "",
      email: "",
      reason: "",
      details: ""
    });
  };

  const faqs = [
    {
      id: "1",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn, unwashed, and undamaged items with original tags attached. Returns must be initiated within 30 days of receiving your order."
    },
    {
      id: "2",
      question: "How do I return an item?",
      answer: "To return an item, please fill out the refund request form below with your order details. Once approved, you will receive a return label via email. Pack your items securely and attach the return label to the package."
    },
    {
      id: "3",
      question: "How long does the refund process take?",
      answer: "After we receive your returned items, it typically takes 5-7 business days to process your refund. The refund will be credited back to your original payment method."
    },
    {
      id: "4",
      question: "Can I exchange an item instead of returning it?",
      answer: "Yes, you can request an exchange for a different size or color. Please indicate this in the details section of the refund request form, specifying the item you'd like to receive instead."
    },
    {
      id: "5",
      question: "Do you offer free returns?",
      answer: "Yes, we provide free returns for all domestic orders. For international orders, return shipping costs are the responsibility of the customer."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-medium mb-4">Returns & Refunds</h1>
          <p className="text-muted-foreground max-w-3xl mb-12">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help you return or exchange your items.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Policy & FAQs */}
            <div>
              <h2 className="text-2xl font-medium mb-6">Return Policy</h2>
              <div className="prose max-w-none">
                <p>
                  We offer a 30-day return policy for all items purchased from our store. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                </p>
                <p className="mt-4">
                  Several types of goods are exempt from being returned, including:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Intimate or sanitary goods</li>
                  <li>Hazardous materials</li>
                  <li>Gift cards</li>
                  <li>Downloadable software products</li>
                  <li>Items marked as final sale or discounted over 50%</li>
                </ul>
                <p className="mt-4">
                  To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer.
                </p>
              </div>

              <h2 className="text-2xl font-medium mt-12 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border rounded-lg">
                    <button
                      className="w-full text-left px-6 py-4 font-medium flex justify-between items-center"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      {faq.question}
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform ${expanded[faq.id] ? 'transform rotate-180' : ''}`} 
                      />
                    </button>
                    {expanded[faq.id] && (
                      <div className="px-6 pb-4">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Refund Request Form */}
            <div className="bg-secondary p-6 rounded-lg">
              <h2 className="text-2xl font-medium mb-6">Request a Refund</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-background"
                    placeholder="e.g., ORD-123456"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-background"
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium mb-1">
                    Reason for Refund *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-background"
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="wrong-size">Wrong Size</option>
                    <option value="damaged">Item Damaged or Defective</option>
                    <option value="not-as-described">Not as Described</option>
                    <option value="wrong-item">Received Wrong Item</option>
                    <option value="didnt-like">Changed Mind</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="details" className="block text-sm font-medium mb-1">
                    Additional Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 border rounded-md bg-background"
                    placeholder="Please provide any additional information about your return request"
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Submit Refund Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
