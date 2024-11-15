import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

export async function addSignatureToPdf(
  pdfFile: File,
  signature: string,
  signerPubkey: string
): Promise<File> {
  // Convert File to ArrayBuffer
  const pdfBytes = await pdfFile.arrayBuffer();
  
  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  // Get all pages
  const pages = pdfDoc.getPages();
  
  // Embed the font
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontSize = 8;
  const watermarkText = `Signed by: ${signerPubkey}`;
  
  // Add watermark to each page
  pages.forEach(page => {
    const { width, height } = page.getSize();

    // Add rotated text in right margin
    page.drawText(watermarkText, {
      x: width - 20, // Position from right edge
      y: height / 2, // Middle of page
      size: fontSize,
      font,
      color: rgb(0.6, 0.6, 0.6), // Light gray color
      rotate: degrees(90), // Rotate 90 degrees
      opacity: 0.5, // Make it semi-transparent
    });
  });
  
  // Add signature box at the bottom of last page
  const lastPage = pages[pages.length - 1];
  const { width } = lastPage.getSize();

  // Add signature box
  lastPage.drawRectangle({
    x: 50,
    y: 50,
    width: width - 100,
    height: 60,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
  
  // Add signature details
  const signatureFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const signatureFontSize = 10;
  const text = `Signed by: ${signerPubkey}`;
  const signatureText = `Signature: ${signature.slice(0, 16)}...${signature.slice(-16)}`;
  const timestamp = `Date: ${new Date().toLocaleString()}`;

  lastPage.drawText(text, {
    x: 60,
    y: 90,
    size: signatureFontSize,
    font: signatureFont,
    color: rgb(0, 0, 0),
  });
  
  lastPage.drawText(signatureText, {
    x: 60,
    y: 75,
    size: signatureFontSize,
    font: signatureFont,
    color: rgb(0, 0, 0),
  });
  
  lastPage.drawText(timestamp, {
    x: 60,
    y: 60,
    size: signatureFontSize,
    font: signatureFont,
    color: rgb(0, 0, 0),
  });
  
  // Save the modified PDF
  const modifiedPdfBytes = await pdfDoc.save();
  
  // Convert back to File object
  return new File([modifiedPdfBytes], pdfFile.name, {
    type: 'application/pdf',
  });
}