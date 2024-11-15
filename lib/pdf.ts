import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function addSignatureToPdf(
  pdfFile: File,
  signature: string,
  signerPubkey: string
): Promise<File> {
  // Convert File to ArrayBuffer
  const pdfBytes = await pdfFile.arrayBuffer();
  
  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  // Get the last page
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];
  
  // Get page dimensions
  const { width } = lastPage.getSize();
  
  // Embed signature text
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 10;
  const text = `Signed by: ${signerPubkey.slice(0, 8)}...${signerPubkey.slice(-8)}`;
  const signatureText = `Signature: ${signature.slice(0, 16)}...${signature.slice(-16)}`;
  const timestamp = `Date: ${new Date().toLocaleString()}`;
  
  // Add signature box at the bottom
  lastPage.drawRectangle({
    x: 50,
    y: 50,
    width: width - 100,
    height: 60,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
  
  // Add text
  lastPage.drawText(text, {
    x: 60,
    y: 90,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  
  lastPage.drawText(signatureText, {
    x: 60,
    y: 75,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  
  lastPage.drawText(timestamp, {
    x: 60,
    y: 60,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  
  // Save the modified PDF
  const modifiedPdfBytes = await pdfDoc.save();
  
  // Convert back to File object
  return new File([modifiedPdfBytes], pdfFile.name, {
    type: 'application/pdf',
  });
}