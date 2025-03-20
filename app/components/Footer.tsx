'use client';

import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-apple-gray mb-4">Shop and Learn</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Store</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Mac</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">iPad</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">iPhone</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Watch</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-apple-gray mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Apple Music</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">iCloud</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Apple One</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Apple Books</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Apple Podcasts</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-apple-gray mb-4">Account</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Manage Your Apple ID</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Apple Store Account</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">iCloud.com</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-apple-gray mb-4">About Apple</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Newsroom</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Apple Leadership</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Career Opportunities</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Investors</a></li>
              <li><a href="#" className="text-sm text-apple-gray hover:text-apple-black">Ethics & Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-apple-gray">
            More ways to shop: <a href="#" className="text-apple-blue hover:underline">Find an Apple Store</a> or <a href="#" className="text-apple-blue hover:underline">other retailer</a> near you. Or call 1-800-MY-APPLE.
          </p>
          <p className="text-sm text-apple-gray mt-4">
            Copyright © 2024 Apple Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;