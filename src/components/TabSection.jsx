import { useState } from "react";

const TabSection = () => {
  const [activeTab, setActiveTab] = useState("details");
  const isMobile = window.innerWidth < 768;

  const tabs = [
    { id: "details", label: "PRODUCT DETAILS" },
    { id: "reviews", label: "REVIEWS" },
    { id: "shipping", label: "SHIPPING & RETURNS" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Desktop Tabs */}
      <div className="hidden md:flex justify-center border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-3 px-6 text-sm font-bold tracking-wide transition-all ${
              activeTab === tab.id
                ? "border-b-4 border-[#A8C93A] text-[#051C54]"
                : "border-b-4 border-transparent text-gray-500 hover:text-[#051C54]"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-2">
        {tabs.map((tab) => (
          <div key={tab.id} className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left py-3 px-4 font-semibold flex justify-between items-center text-[#051C54]"
              onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
            >
              {tab.label}
              <span className="text-xl font-bold">
                {activeTab === tab.id ? "−" : "+"}
              </span>
            </button>
            {activeTab === tab.id && (
              <div className="px-4 pb-4 text-sm text-gray-700">
                {renderTabContent(tab.id)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tab Content Desktop */}
      <div className="hidden md:block mt-6 text-sm text-gray-700 px-2">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

const renderTabContent = (tabId) => {
  switch (tabId) {
    case "details":
      return (
        <>
          <h2 className="font-bold text-[#051C54] mb-2 text-lg">
            HNM Naturals Deep Hydration Night Repair Cream
          </h2>
          <p className="mb-4">
            Awaken to softer, smoother, and deeply hydrated skin with{" "}
            <strong>HNM Naturals Deep Hydration Night Repair Cream</strong>, a
            luxurious blend of premium plant-based herbal extracts and
            nourishing ingredients...
          </p>
          <h3 className="font-bold text-[#051C54] text-md mt-6 mb-2">
            Why Choose It?
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Intense Hydration:</strong> Locks in moisture for supple,
              dewy skin.
            </li>
            <li>
              <strong>Repairs & Revitalizes:</strong> Chamomile & Turmeric help
              repair skin.
            </li>
            <li>
              <strong>Anti-Aging:</strong> Boosts collagen, smooths fine lines.
            </li>
            <li>
              <strong>Soothing:</strong> Reduces irritation and redness.
            </li>
            <li>
              <strong>Clean Formula:</strong> No parabens, no harsh chemicals.
            </li>
          </ul>
        </>
      );
    case "reviews":
      return (
        <p className="text-gray-600">
          No reviews yet. Be the first to write one!
        </p>
      );
    case "shipping":
      return (
        <div className="space-y-2 text-gray-600">
          <p>
            <strong>Shipping:</strong> Free standard shipping on all orders.
          </p>
          <p>
            <strong>Returns:</strong> 30-day money-back guarantee if you're not
            satisfied.
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default TabSection;
