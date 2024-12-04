import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { MainQuestion } from './components/MainQuestion';
import { DateOptions } from './components/DateOptions';
import { Celebration } from './components/Celebration';

interface DateOption {
  title: string;
  time: string;
  location: string;
  description: string;
  note: string;
  image: string;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
  const girlfriendName = "Meowie";

  const handleDateSelection = (date: DateOption) => {
    setSelectedDate(date);
    setCurrentStep(3);
  };

  const steps = [
    <LandingPage key="landing" name={girlfriendName} onContinue={() => setCurrentStep(1)} />,
    <MainQuestion key="question" onAccept={() => setCurrentStep(2)} />,
    <DateOptions key="options" onSelect={handleDateSelection} />,
    <Celebration key="celebration" selectedDate={selectedDate} />
  ];

  return steps[currentStep];
}