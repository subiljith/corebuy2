import React, { useState } from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'apparel' | 'footwear'>('apparel');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#e4beb4] relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5b4039] hover:text-[#1c1b1b] p-1 rounded-full hover:bg-[#f0edec]"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#b02f00] text-2xl">straighten</span>
          <h2 className="font-display font-bold text-xl text-[#1c1b1b]">Standard Indian Size Guide</h2>
        </div>
        <p className="text-xs text-[#5b4039] mb-4">
          All CoreBuy performance products are engineered tailored to Indian athletic body proportions.
        </p>

        {/* Tab switch */}
        <div className="flex border-b border-[#e4beb4]/50 mb-4">
          <button
            onClick={() => setActiveTab('apparel')}
            className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'apparel'
                ? 'border-[#b02f00] text-[#b02f00]'
                : 'border-transparent text-[#5b4039]'
            }`}
          >
            Apparel (T-Shirts &amp; Shorts)
          </button>
          <button
            onClick={() => setActiveTab('footwear')}
            className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'footwear'
                ? 'border-[#b02f00] text-[#b02f00]'
                : 'border-transparent text-[#5b4039]'
            }`}
          >
            Footwear (UK / India Sizes)
          </button>
        </div>

        {/* Apparel Chart */}
        {activeTab === 'apparel' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f0edec] text-[#1c1b1b] uppercase font-bold">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Chest (Inches)</th>
                  <th className="p-2.5">Waist (Inches)</th>
                  <th className="p-2.5">Length (Inches)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebe7e7] text-[#5b4039]">
                <tr>
                  <td className="p-2.5 font-bold text-[#1c1b1b]">S</td>
                  <td className="p-2.5">36 - 38</td>
                  <td className="p-2.5">28 - 30</td>
                  <td className="p-2.5">27.5</td>
                </tr>
                <tr className="bg-[#ffdbd1]/20 font-medium">
                  <td className="p-2.5 font-bold text-[#b02f00]">M (Most Popular)</td>
                  <td className="p-2.5">38 - 40</td>
                  <td className="p-2.5">30 - 32</td>
                  <td className="p-2.5">28.5</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-[#1c1b1b]">L</td>
                  <td className="p-2.5">40 - 42</td>
                  <td className="p-2.5">32 - 34</td>
                  <td className="p-2.5">29.5</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-[#1c1b1b]">XL</td>
                  <td className="p-2.5">42 - 44</td>
                  <td className="p-2.5">34 - 36</td>
                  <td className="p-2.5">30.5</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-[#1c1b1b]">XXL</td>
                  <td className="p-2.5">44 - 46</td>
                  <td className="p-2.5">36 - 38</td>
                  <td className="p-2.5">31.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f0edec] text-[#1c1b1b] uppercase font-bold">
                <tr>
                  <th className="p-2.5">India / UK</th>
                  <th className="p-2.5">US</th>
                  <th className="p-2.5">EU</th>
                  <th className="p-2.5">Foot Length (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebe7e7] text-[#5b4039]">
                <tr>
                  <td className="p-2.5 font-bold text-[#1c1b1b]">UK 7</td>
                  <td className="p-2.5">US 8</td>
                  <td className="p-2.5">EU 41</td>
                  <td className="p-2.5">25.5 cm</td>
                </tr>
                <tr className="bg-[#ffdbd1]/20 font-medium">
                  <td className="p-2.5 font-bold text-[#b02f00]">UK 8 (Popular)</td>
                  <td className="p-2.5">US 9</td>
                  <td className="p-2.5">EU 42</td>
                  <td className="p-2.5">26.5 cm</td>
                </tr>
                <tr className="bg-[#ffdbd1]/20 font-medium">
                  <td className="p-2.5 font-bold text-[#b02f00]">UK 9 (Popular)</td>
                  <td className="p-2.5">US 10</td>
                  <td className="p-2.5">EU 43</td>
                  <td className="p-2.5">27.5 cm</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-[#1c1b1b]">UK 10</td>
                  <td className="p-2.5">US 11</td>
                  <td className="p-2.5">EU 44</td>
                  <td className="p-2.5">28.5 cm</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-[#1c1b1b]">UK 11</td>
                  <td className="p-2.5">US 12</td>
                  <td className="p-2.5">EU 45</td>
                  <td className="p-2.5">29.5 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#b02f00] text-white text-xs font-bold px-5 py-2.5 rounded-lg"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
