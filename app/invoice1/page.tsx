"use client";

import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import InvoiceDocument from "./components/invoice-pdf";

export default function page() {
    const data = {
  companyName: 'Alzaf POS Solutions',
  address: '#4613, Dada Tower (2nd Flore), Madhupur Tangail',
  number: '+880913815815',
  site:"www.alzafpos.com",
  support:'Support@alzafpos.com',
  date: '01/01/2023',
  totalAmount: 2500,
};

  return (
    <div className="flex justify-center">
      <PDFViewer width="1600" height="900">
        <InvoiceDocument  data={data} />
      </PDFViewer>
    </div>
  );
}

