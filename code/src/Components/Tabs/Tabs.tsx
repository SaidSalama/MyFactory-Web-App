// src/components/Tabs.jsx
import React, { useState } from 'react';
import './Tabs.css';

export default function Tabs({ defaultValue = "overview", children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Find all TabsTrigger and TabsContent from children
  const triggers = [];
  const contents = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === TabsTrigger) {
      triggers.push({ ...child.props, onClick: () => setActiveTab(child.props.value) });
    } else if (child.type === TabsContent) {
      contents.push(child);
    }
  });

  return (
    <div className="custom-tabs">
      <div className="tabs-list">
        {triggers.map((trigger) => (
          <button
            key={trigger.value}
            onClick={trigger.onClick}
            className={`tab-trigger ${activeTab === trigger.value ? 'active' : ''}`}
          >
            {trigger.children}
          </button>
        ))}
      </div>

      <div className="tabs-content">
        {contents.find((content) => content.props.value === activeTab)?.props.children}
      </div>
    </div>
  );
}

// Sub-components
export function TabsTrigger({ children }) {
  return <>{children}</>;
}

export function TabsContent({ children }) {
  return <>{children}</>;
}