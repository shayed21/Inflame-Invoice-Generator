
import React, { useState } from 'react';
import { Menu, X, HelpCircle, FileText, ScrollText } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Inflame
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-purple-200 transition-colors duration-200 flex items-center space-x-1">
              <HelpCircle size={18} />
              <span className="font-medium">Help</span>
            </a>
            <a href="#" className="text-white hover:text-purple-200 transition-colors duration-200 flex items-center space-x-1">
              <FileText size={18} />
              <span className="font-medium">Guide</span>
            </a>
            <a href="#" className="text-white hover:text-purple-200 transition-colors duration-200 flex items-center space-x-1">
              <ScrollText size={18} />
              <span className="font-medium">Terms & Conditions</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/20 mt-2">
            <nav className="flex flex-col space-y-3 pt-4">
              <a href="#" className="text-white hover:text-purple-200 transition-colors duration-200 flex items-center space-x-2">
                <HelpCircle size={18} />
                <span className="font-medium">Help</span>
              </a>
              <a href="#" className="text-white hover:text-purple-200 transition-colors duration-200 flex items-center space-x-2">
                <FileText size={18} />
                <span className="font-medium">Guide</span>
              </a>
              <a href="#" className="text-white hover:text-purple-200 transition-colors duration-200 flex items-center space-x-2">
                <ScrollText size={18} />
                <span className="font-medium">Terms & Conditions</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
