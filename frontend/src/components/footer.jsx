import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-6 border-t text-sm">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p className="">
          🛠️ Built with the <strong>MERN Stack</strong>: MongoDB, Express.js, React, and Node.js
        </p>
        <p className="">
          📦 Packages used: <strong>Axios</strong>, <strong>React Hot Toast</strong>, <strong>Lucide React</strong>, and more
        </p>
        <p className="text-gray-500">
          © {new Date().getFullYear()} Created by <strong>RISHI VIJAY VISHWAKARMA</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
