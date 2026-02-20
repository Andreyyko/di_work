import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const getTodayDate = () => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const generateCertificateNumber = () => {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${random}/${year}`;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

export async function generateCertificate() {
  const data = {
    name: "Олег Андрейко",
    number: generateCertificateNumber(),
    date: getTodayDate(),
  };

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const page = pdfDoc.addPage([842, 595]);

  const bgBytes = await fetch(
    "/images/CommonImages/CertificatePDF/Certificate.png"
  ).then((r) => r.arrayBuffer());

  const bgImage = await pdfDoc.embedPng(bgBytes);
  page.drawImage(bgImage, {
    x: 0,
    y: 0,
    width: 842,
    height: 595,
  });

  const fontBytes = await fetch("/fonts/Grava-Normal.ttf").then((r) =>
    r.arrayBuffer()
  );

  const font = await pdfDoc.embedFont(fontBytes);

  page.drawText(data.name, {
    x: 72,
    y: 175,
    size: 25,
    font,
    color: rgb(1, 0.984, 0.937),
  });

  page.drawText(`Номер сертифіката: № ${data.number}`, {
    x: 634,
    y: 440,
    size: 10,
    font,
    color: rgb(0.702, 0.541, 0.533),
  });

  page.drawText(`Дата: ${data.date}`, {
    x: 700,
    y: 455,
    size: 10,
    font,
    color: rgb(0.702, 0.541, 0.533),
  });


  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const fileName = `Certificate_${data.number.replace("/", "-")}_${slugify(
    data.name
  )}.pdf`;

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}
