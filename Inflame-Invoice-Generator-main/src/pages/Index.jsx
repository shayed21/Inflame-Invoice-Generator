import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from "../components/ItemDetails";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { templates } from "../utils/templateRegistry";
import { FiEdit, FiFileText, FiTrash2, FiX } from "react-icons/fi";
import { RefreshCw } from "lucide-react";

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};

const noteOptions = [
  "Thank you for choosing us today! We hope your shopping experience was pleasant and seamless. Your satisfaction matters to us, and we look forward to serving you again soon. Keep this receipt for any returns or exchanges.",
  "Your purchase supports our community! We believe in giving back and working towards a better future. Thank you for being a part of our journey. We appreciate your trust and hope to see you again soon.",
  "We value your feedback! Help us improve by sharing your thoughts on the text message survey link. Your opinions help us serve you better and improve your shopping experience. Thank you for shopping with us!",
  "Did you know you can save more with our loyalty program? Ask about it on your next visit and earn points on every purchase. It’s our way of saying thank you for being a loyal customer. See you next time!",
  "Need assistance with your purchase? We’re here to help! Reach out to our customer support, or visit our website for more information. We’re committed to providing you with the best service possible.",
  "Keep this receipt for returns or exchanges.",
  "Every purchase makes a difference! We are dedicated to eco-friendly practices and sustainability. Thank you for supporting a greener planet with us. Together, we can build a better tomorrow.",
  "Have a great day!",
  "“Thank you for shopping with us today. Did you know you can return or exchange your items within 30 days with this receipt? We want to ensure that you’re happy with your purchase, so don’t hesitate to come back if you need assistance.",
  "Eco-friendly business. This receipt is recyclable.",
  "We hope you enjoyed your shopping experience! Remember, for every friend you refer, you can earn exclusive rewards. Visit www.example.com/refer for more details. We look forward to welcoming you back soon!",
  "Thank you for choosing us! We appreciate your business and look forward to serving you again. Keep this receipt for any future inquiries or returns.",
  "Your purchase supports local businesses and helps us continue our mission. Thank you for being a valued customer. We hope to see you again soon!",
  "We hope you had a great shopping experience today. If you have any feedback, please share it with us on our website. We are always here to assist you.",
  "Thank you for your visit! Remember, we offer exclusive discounts to returning customers. Check your email for special offers on your next purchase.",
  "Your satisfaction is our top priority. If you need any help or have questions about your purchase, don’t hesitate to contact us. Have a great day!",
  "We love our customers! Thank you for supporting our business. Follow us on social media for updates on promotions and new products. See you next time!",
  "Every purchase counts! We are committed to making a positive impact, and your support helps us achieve our goals. Thank you for shopping with us today!",
  "We hope you found everything you needed. If not, please let us know so we can improve your experience. Your feedback helps us serve you better. Thank you!",
  "Thank you for visiting! Did you know you can save more with our rewards program? Ask about it during your next visit and start earning points today!",
  "We appreciate your trust in us. If you ever need assistance with your order, please visit our website or call customer service. We’re here to help!",
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("BDT");
  const [billTo, setBillTo] = useState({ name: "", address: "", phone: "" });
  const [shipTo, setShipTo] = useState({ name: "", address: "", phone: "" });
  const [invoice, setInvoice] = useState({
    date: "",
    paymentDate: "",
    number: "",
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
    logo: null,
  });
  const [items, setItems] = useState([]);
  const [taxType, setTaxType] = useState('percentage'); // 'percentage' or 'flat'
  const [taxValue, setTaxValue] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("");
  const [discountType, setDiscountType] = useState('percentage'); // 'percentage' or 'flat'
  const [discountValue, setDiscountValue] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  // Create formData object for BillToSection
  const formData = {
    billTo,
    shipTo,
    invoice,
    yourCompany,
    items,
    taxType,
    taxValue,
    taxAmount,
    subTotal,
    grandTotal,
    notes,
    selectedCurrency,
    discountType,
    discountValue,
    shippingCharge
  };

  const setFormData = (updater) => {
    const newData = typeof updater === 'function' ? updater(formData) : updater;

    if (newData.billTo !== formData.billTo) setBillTo(newData.billTo);
    if (newData.shipTo !== formData.shipTo) setShipTo(newData.shipTo);
    if (newData.invoice !== formData.invoice) setInvoice(newData.invoice);
    if (newData.yourCompany !== formData.yourCompany) setYourCompany(newData.yourCompany);
    if (newData.items !== formData.items) setItems(newData.items);
    if (newData.taxType !== formData.taxType) setTaxType(newData.taxType);
    if (newData.taxValue !== formData.taxValue) setTaxValue(newData.taxValue);
    if (newData.notes !== formData.notes) setNotes(newData.notes);
    if (newData.selectedCurrency !== formData.selectedCurrency) setSelectedCurrency(newData.selectedCurrency);
    if (newData.discountType !== formData.discountType) setDiscountType(newData.discountType);
    if (newData.discountValue !== formData.discountValue) setDiscountValue(newData.discountValue);
    if (newData.shippingCharge !== formData.shippingCharge) setShippingCharge(newData.shippingCharge);
  };

  const refreshNotes = () => {
    const randomIndex = Math.floor(Math.random() * noteOptions.length);
    setNotes(noteOptions[randomIndex]);
  };

  const toggleTaxType = () => {
    setTaxType(taxType === 'percentage' ? 'flat' : 'percentage');
  };

  const toggleDiscountType = () => {
    setDiscountType(discountType === 'percentage' ? 'flat' : 'percentage');
  };

  const resetTax = () => {
    setTaxValue(0);
  };

  const resetDiscount = () => {
    setDiscountValue(0);
  };

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || { name: "", address: "", phone: "" });
      setShipTo(parsedData.shipTo || { name: "", address: "", phone: "" });
      setInvoice(
        parsedData.invoice || { date: "", paymentDate: "", number: "" }
      );
      setYourCompany(
        parsedData.yourCompany || { name: "", address: "", phone: "" }
      );
      setItems(parsedData.items || []);
      setTaxType(parsedData.taxType || 'percentage');
      setTaxValue(parsedData.taxValue || 0);
      setNotes(parsedData.notes || "");
      setSelectedCurrency(parsedData.selectedCurrency || "BDT");
      setDiscountType(parsedData.discountType || 'percentage');
      setDiscountValue(parsedData.discountValue || 0);
      setShippingCharge(parsedData.shippingCharge || 0);
    } else {
      // If no saved data, set invoice number
      setInvoice((prev) => ({
        ...prev,
        number: generateRandomInvoiceNumber(),
      }));
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
      billTo,
      shipTo,
      invoice,
      yourCompany,
      items,
      taxType,
      taxValue,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
      selectedCurrency,
      discountType,
      discountValue,
      shippingCharge
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    billTo,
    shipTo,
    invoice,
    yourCompany,
    items,
    taxType,
    taxValue,
    notes,
    taxAmount,
    subTotal,
    grandTotal,
    selectedCurrency,
    discountType,
    discountValue,
    shippingCharge
  ]);

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
    updateTotals();
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    const calculatedSubTotal = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
    setSubTotal(calculatedSubTotal);
    return calculatedSubTotal;
  };

  const calculateTaxAmount = (subTotalValue, discountAmount) => {
    const taxableAmount = subTotalValue - discountAmount;
    let tax;
    if (taxType === 'percentage') {
      tax = (taxableAmount * taxValue) / 100;
    } else {
      tax = taxValue;
    }
    setTaxAmount(tax);
    return tax;
  };

  const calculateDiscountAmount = (subTotalValue) => {
    let discount;
    if (discountType === 'percentage') {
      discount = (subTotalValue * discountValue) / 100;
    } else {
      discount = discountValue;
    }
    return discount > subTotalValue ? subTotalValue : discount;
  };

  const calculateGrandTotal = (subTotalValue, taxAmountValue, discountAmount, shippingChargeValue) => {
    const total = (parseFloat(subTotalValue) - parseFloat(discountAmount)) + parseFloat(taxAmountValue) + parseFloat(shippingChargeValue);
    setGrandTotal(total);
    return total;
  };

  const updateTotals = () => {
    const currentSubTotal = calculateSubTotal();
    const currentDiscount = calculateDiscountAmount(currentSubTotal);
    const currentTaxAmount = calculateTaxAmount(currentSubTotal, currentDiscount);
    calculateGrandTotal(currentSubTotal, currentTaxAmount, currentDiscount, shippingCharge);
  };

  const handleTaxChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setTaxValue(value);
  };

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDiscountValue(value);
  };

  const handleShippingChargeChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setShippingCharge(value);
  };

  useEffect(() => {
    updateTotals();
  }, [items, taxType, taxValue, discountType, discountValue, shippingCharge]);

  const handleTemplateClick = (templateNumber) => {
    const formData = {
      billTo,
      shipTo,
      invoice,
      yourCompany,
      items,
      taxType,
      taxValue,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
      selectedCurrency,
      discountType,
      discountValue,
      shippingCharge
    };
    navigate("/template", {
      state: { formData, selectedTemplate: templateNumber },
    });
  };

  const fillDummyData = () => {
    setBillTo({
      name: "John Doe",
      address: "123 Main St, Anytown, USA",
      phone: "(555) 123-4567",
    });
    setShipTo({
      name: "Jane Smith",
      address: "456 Elm St, Othertown, USA",
      phone: "(555) 987-6543",
    });
    setInvoice({
      date: new Date().toISOString().split("T")[0],
      paymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({
      name: "Your Company",
      address: "789 Oak St, Businessville, USA",
      phone: "(555) 555-5555",
      logo: null,
    });
    setItems([
      {
        name: "Product A",
        description: "High-quality item",
        quantity: 2,
        amount: 50,
        total: 100,
      },
      {
        name: "Service B",
        description: "Professional service",
        quantity: 1,
        amount: 200,
        total: 200,
      },
    ]);
    setTaxType('percentage');
    setTaxValue(10);
    setDiscountType('flat');
    setDiscountValue(20);
    setShippingCharge(15);
    calculateSubTotal();
    setNotes("Thank you for your business!");
  };

  const clearForm = () => {
    setBillTo({ name: "", address: "", phone: "" });
    setShipTo({ name: "", address: "", phone: "" });
    setInvoice({
      date: "",
      paymentDate: "",
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({ name: "", address: "", phone: "" });
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    setTaxType('percentage');
    setTaxValue(0);
    setDiscountType('percentage');
    setDiscountValue(0);
    setShippingCharge(0);
    setNotes("");
    localStorage.removeItem("formData");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8 relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Inflame - Professional Bill Generator
          </h1>
          <p className="text-gray-600 text-lg font-medium">Create beautiful invoices with ease</p>
        </div>

        <div className="fixed top-20 left-4 flex gap-2 z-40">
          <button
            onClick={clearForm}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-full shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
            aria-label="Clear Form"
          >
            <FiTrash2 size={20} />
          </button>
          <button
            onClick={fillDummyData}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            aria-label="Fill with Dummy Data"
          >
            <FiEdit size={20} />
          </button>
        </div>

        <button
          onClick={() =>
            navigate("/receipt", {
              state: {
                formData: {
                  billTo,
                  shipTo,
                  invoice,
                  yourCompany,
                  items,
                  taxType,
                  taxValue,
                  notes,
                  selectedCurrency,
                  discountType,
                  discountValue,
                  shippingCharge
                },
              },
            })
          }
          className="fixed top-20 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 z-40"
          aria-label="Switch to Receipt"
        >
          <FiFileText size={20} />
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <form>
              <BillToSection
                billTo={billTo}
                handleInputChange={handleInputChange(setBillTo)}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                formData={formData}
                setFormData={setFormData}
              />
              <ShipToSection
                shipTo={shipTo}
                handleInputChange={handleInputChange(setShipTo)}
                billTo={billTo}
              />

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Invoice Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FloatingLabelInput
                    id="invoiceNumber"
                    label="Invoice Number"
                    value={invoice.number}
                    onChange={handleInputChange(setInvoice)}
                    name="number"
                  />
                  <FloatingLabelInput
                    id="invoiceDate"
                    label="Invoice Date"
                    type="date"
                    value={invoice.date}
                    onChange={handleInputChange(setInvoice)}
                    name="date"
                  />
                  <FloatingLabelInput
                    id="paymentDate"
                    label="Payment Date"
                    type="date"
                    value={invoice.paymentDate}
                    onChange={handleInputChange(setInvoice)}
                    name="paymentDate"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Company</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingLabelInput
                    id="yourCompanyName"
                    label="Name"
                    value={yourCompany.name}
                    onChange={handleInputChange(setYourCompany)}
                    name="name"
                  />
                  <FloatingLabelInput
                    id="yourCompanyPhone"
                    label="Phone"
                    value={yourCompany.phone}
                    onChange={handleInputChange(setYourCompany)}
                    name="phone"
                  />
                </div>
                <FloatingLabelInput
                  id="yourCompanyAddress"
                  label="Address"
                  value={yourCompany.address}
                  onChange={handleInputChange(setYourCompany)}
                  name="address"
                  className="mt-4"
                />
                <FloatingLabelInput
                  id="yourCompanyLogo"
                  label="Logo"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setYourCompany((prev) => ({
                        ...prev,
                        logo: URL.createObjectURL(file),
                      }));
                    }
                  }}
                  className="mt-4"
                />
              </div>

              <ItemDetails
                items={items}
                handleItemChange={handleItemChange}
                addItem={addItem}
                removeItem={removeItem}
                currencyCode={selectedCurrency}
              />

              <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Totals</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Sub Total:</span>
                    <span className="font-bold text-lg">{formatCurrency(subTotal, selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Discount:</span>
                    <div className="flex items-center">

                      <input
                        type="number"
                        value={discountValue}
                        onChange={handleDiscountChange}
                        className="w-24 p-2 border rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        min=""
                        step={discountType === 'percentage' ? "1" : "0.01"}
                      />
                      <button
                        onClick={toggleDiscountType}
                        className="p-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors duration-200"
                        title="Toggle Discount Type"
                      >
                        {discountType === 'percentage' ? '%' : '$'}
                      </button>
                      <button
                        onClick={resetDiscount}
                        className="p-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors duration-200 ml-1"
                        title="Clear Discount"
                      >
                        <FiX size={16} className="text-purple-600" />
                      </button>

                    </div>

                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Discount Amount:</span>
                    <span className="font-bold text-lg">{formatCurrency(calculateDiscountAmount(subTotal), selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Shipping Charge:</span>
                    <input
                      type="number"
                      value={shippingCharge}
                      onChange={handleShippingChargeChange}
                      className="w-24 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Tax:</span>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={taxValue}
                        onChange={handleTaxChange}
                        className="w-24 p-2 border rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        min="0"
                        step={taxType === 'percentage' ? "1" : "0.01"}
                      />
                      <button
                        onClick={toggleTaxType}
                        className="p-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors duration-200"
                        title="Toggle Tax Type"
                      >
                        {taxType === 'percentage' ? '%' : '$'}
                      </button>
                      <button
                        onClick={resetTax}
                        className="p-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors duration-200 ml-1"
                        title="Clear Tax"
                      >
                        <FiX size={16} className="text-purple-600" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Tax Amount:</span>
                    <span className="font-bold text-lg">{formatCurrency(taxAmount, selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-purple-300">
                    <span className="font-bold text-xl text-gray-800">Grand Total:</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {formatCurrency(grandTotal, selectedCurrency)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Notes</h3>
                  <button
                    type="button"
                    onClick={refreshNotes}
                    className="ml-3 p-2 rounded-full hover:bg-purple-100 transition-colors duration-200"
                    title="Refresh Notes"
                  >
                    <RefreshCw size={16} className="text-purple-600" />
                  </button>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="4"
                  placeholder="Add any additional notes here..."
                ></textarea>
              </div>
            </form>
          </div>

          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Template Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className="template-card bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-300 transform hover:scale-105"
                  onClick={() => handleTemplateClick(index + 1)}
                >
                  <img
                    src={`/assets/template${index + 1}-preview.png`}
                    alt={template.name}
                    className={`w-full ${template.name === "Template 10"
                        ? "h-[38px] w-[57px]"
                        : "h-32"
                      } object-cover rounded-lg mb-3 shadow-sm`}
                  />
                  <p className="text-center font-semibold text-gray-700">{template.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;