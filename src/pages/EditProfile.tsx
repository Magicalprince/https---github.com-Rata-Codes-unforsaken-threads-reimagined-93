import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { updateCustomer } from "@/lib/airtable";
import { useToast } from "@/components/ui/use-toast";

const EditProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.fields) {
      navigate("/profile"); // Redirect if not logged in or no user data
      return;
    }
    // Pre-fill form with current user data
    setFormData({
      name: user.fields.Name || '',
      phone: user.fields.Phone || '',
      address: user.fields.Address || '',
      city: user.fields.City || '',
      state: user.fields.State || '',
      zipCode: user.fields.Zipcode || '',
    });
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsLoading(true);

    try {
      await updateCustomer(user.id, {
        Name: formData.name,
        Phone: formData.phone,
        Address: formData.address,
        City: formData.city,
        State: formData.state,
        Zipcode: formData.zipCode,
      });
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated.",
      });
      // Optionally refresh user data in AuthContext if needed
      // This might require adding a refreshUser function to AuthContext
      navigate("/profile"); // Navigate back to profile page
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || !user) return null; // Render nothing while redirecting or loading

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={formData.address} onChange={handleInputChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={formData.city} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" value={formData.state} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/profile")}>
              Cancel
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile; 