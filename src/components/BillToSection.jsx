
import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from 'lucide-react';

const BillToSection = ({ billTo, handleInputChange, selectedCurrency, setSelectedCurrency, formData, setFormData }) => {
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (setFormData) {
          setFormData(prev => ({
            ...prev,
            yourCompany: {
              ...prev.yourCompany,
              logo: e.target.result
            }
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    if (setFormData) {
      setFormData(prev => ({
        ...prev,
        yourCompany: {
          ...prev.yourCompany,
          logo: null
        }
      }));
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Select Currency</h3>
        <RadioGroup
          value={selectedCurrency}
          onValueChange={setSelectedCurrency}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="BDT" id="bdt" />
            <Label htmlFor="bdt" className="font-medium">BDT (৳)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="USD" id="usd" />
            <Label htmlFor="usd" className="font-medium">USD ($)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Company Logo</h3>
        <div className="flex items-center space-x-4">
          {formData?.yourCompany?.logo ? (
            <div className="relative">
              <img 
                src={formData.yourCompany.logo} 
                alt="Company Logo" 
                className="w-20 h-20 object-contain border border-gray-300 rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={removeLogo}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            <Label htmlFor="logo-upload" className="cursor-pointer">
              <Button type="button" variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </span>
              </Button>
            </Label>
            <p className="text-sm text-gray-500 mt-1">Recommended: 200x200px, PNG or JPG</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Bill To</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          id="billToName"
          label="Name"
          value={billTo.name}
          onChange={handleInputChange}
          name="name"
        />
        <FloatingLabelInput
          id="billToPhone"
          label="Phone"
          value={billTo.phone}
          onChange={handleInputChange}
          name="phone"
        />
      </div>
      <FloatingLabelInput
        id="billToAddress"
        label="Address"
        value={billTo.address}
        onChange={handleInputChange}
        name="address"
        className="mt-4"
      />
    </div>
  );
};

export default BillToSection;
