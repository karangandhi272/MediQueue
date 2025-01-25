import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface Patient {
  name: string;
  queue: number;
  symptoms: string;
  healthCard: string;
  address: string;
  waitTime: string;
}

const Hospital: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      name: 'John Doe',
      queue: 3,
      symptoms: 'Flu-like symptoms, fever',
      healthCard: '1234567890',
      address: '123 Main St, Anytown USA',
      waitTime: '45 mins',
    },
    {
        name: 'John Doe',
        queue: 3,
        symptoms: 'Flu-like symptoms, fever',
        healthCard: '1234567890',
        address: '123 Main St, Anytown USA',
        waitTime: '45 mins',
      },
      {
        name: 'John Doe',
        queue: 3,
        symptoms: 'Flu-like symptoms, fever',
        healthCard: '1234567890',
        address: '123 Main St, Anytown USA',
        waitTime: '45 mins',
      },
      {
        name: 'John Doe',
        queue: 3,
        symptoms: 'Flu-like symptoms, fever',
        healthCard: '1234567890',
        address: '123 Main St, Anytown USA',
        waitTime: '45 mins',
      },
      {
        name: 'John Doe',
        queue: 3,
        symptoms: 'Flu-like symptoms, fever',
        healthCard: '1234567890',
        address: '123 Main St, Anytown USA',
        waitTime: '45 mins',
      },
    {
      name: 'Jane Smith',
      queue: 7,
      symptoms: 'Headache, nausea',
      healthCard: '0987654321',
      address: '456 Oak Rd, Othertown USA',
      waitTime: '1 hour',
    },
    {
      name: 'Bob Johnson',
      queue: 12,
      symptoms: 'Chest pain, shortness of breath',
      healthCard: '4567890123',
      address: '789 Elm St, Somewhere USA',
      waitTime: '1.5 hours',
    },
  ]);

  const [expandedPatient, setExpandedPatient] = useState<number | null>(null);

  const handleRemovePatient = (index: number) => {
    const updatedPatients = [...patients];
    updatedPatients.splice(index, 1);
    setPatients(updatedPatients);
  };

  const handleExpandPatient = (index: number) => {
    setExpandedPatient(expandedPatient === index ? null : index);
  };

  return (
    <div className="p-8">
      <Card className="max-w-4xl mx-auto p-4">
        <CardHeader>
          <CardTitle>Patient Queue</CardTitle>
        </CardHeader>
        <CardContent>
          {patients.map((patient, index) => (
            <Card key={index} className={`mb-4 ${expandedPatient === index ? 'max-h-full' : 'max-h-32'}`}>
              <CardHeader className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="font-medium">Queue #{patient.queue}</div>
                  <div className="font-medium">{patient.name}</div>
                </div>
                <div className="flex items-center space-x-2">
                  {expandedPatient === index && (
                    <div>
                      <p>Symptoms: {patient.symptoms}</p>
                      <p>Health Card: {patient.healthCard}</p>
                      <p>Address: {patient.address}</p>
                      <p>Wait Time: {patient.waitTime}</p>
                    </div>
                  )}
                  <Button variant="ghost" onClick={() => handleRemovePatient(index)}>
                    Remove
                  </Button>
                  <Button variant="ghost" onClick={() => handleExpandPatient(index)}>
                    <ChevronDown className={`h-5 w-5 transition-transform ${expandedPatient === index ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Hospital;
