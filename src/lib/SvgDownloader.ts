export const downloadSvgElement = (id:string) => {
  const elem = document.getElementById(id);
  if (!(elem instanceof SVGSVGElement)) {
    return false;
  }
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(elem);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = '4sector_balancesheet.svg';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(svgUrl);
  document.body.removeChild(downloadLink);
  return true;
}