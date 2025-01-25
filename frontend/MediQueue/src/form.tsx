import React, { useState, FormEvent } from 'react';
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";

// Validation schemas
const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  healthCardNumber: z.string().length(10, "Health card must be 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  symptoms: z.string().optional()
});

const loginSchema = z.object({
  healthCardNumber: z.string().length(10, "Health card must be 10 digits")
});

type FormData = z.infer<typeof registrationSchema>;

const Form: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    healthCardNumber: '',
    address: '',
    symptoms: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      registrationSchema.parse(formData);
      toast({
        title: "Registration Successful",
        description: "Your information has been submitted.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: err.message,
          });
        });
      }
    }
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      loginSchema.parse({ healthCardNumber: formData.healthCardNumber });
      toast({
        title: "Login Successful",
        description: "You are now logged in.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast({
            variant: "destructive",
            title: "Login Error",
            description: err.message,
          });
        });
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-2xl"
      >
        <Card className="w-full rounded-3xl shadow-2xl overflow-hidden">
          <Tabs defaultValue="registration">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger 
                value="registration" 
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white"
              >
                Registration
              </TabsTrigger>
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="registration">
              <CardHeader className="bg-rose-50">
                <CardTitle className="text-2xl font-bold text-rose-600">Health Registration</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Health Card Number</Label>
                    <Input 
                      name="healthCardNumber"
                      value={formData.healthCardNumber}
                      onChange={handleChange}
                      placeholder="10-digit health card number"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Symptoms</Label>
                    <Textarea 
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      placeholder="Describe your symptoms in detail"
                      className="rounded-xl min-h-[150px] resize-y"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-rose-600 hover:bg-rose-700 rounded-xl transition-all duration-300"
                  >
                    Submit Registration
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="login">
              <CardHeader className="bg-rose-50">
                <CardTitle className="text-2xl font-bold text-rose-600">Health Card Login</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <Label>Health Card Number</Label>
                    <Input 
                      name="healthCardNumber"
                      value={formData.healthCardNumber}
                      onChange={handleChange}
                      placeholder="Enter your health card number"
                      className="rounded-xl"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-rose-600 hover:bg-rose-700 rounded-xl transition-all duration-300"
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
      <Toaster />
    </motion.div>
  );
};

export default Form;